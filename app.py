from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
import os
import sqlite3
import chatbot
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
DB_FILE = 'voulentree.db'

# -------------------- DATABASE --------------------

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def create_all_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # Opportunities table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS opportunities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            location TEXT NOT NULL,
            cause TEXT,
            is_remote BOOLEAN,
            ngo_name TEXT NOT NULL
        )
    ''')

    # Volunteers applied table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS volunteers_applied (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            opportunity_id INTEGER NOT NULL,
            FOREIGN KEY (opportunity_id) REFERENCES opportunities(id)
        )
    ''')

    # ✅ New joblisting table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS joblisting (
            org_name VARCHAR(30) NOT NULL,
            org_gmail VARCHAR(40) PRIMARY KEY,
            org_location VARCHAR(100) NOT NULL,
            org_requirement VARCHAR(50) NOT NULL,
            org_durationdays INTEGER NOT NULL,
            org_durationtime VARCHAR(30) NOT NULL,
            org_stipend INTEGER,
            org_msg VARCHAR(100)
        )
    ''')

    conn.commit()
    conn.close()

# Call at startup
create_all_tables()

# -------------------- ROUTES --------------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/loginyt')
def loginyt():
    return render_template('loginyt.html')

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    email = request.form.get('email')
    raw_password = request.form.get('password')
    password = generate_password_hash(raw_password)

    if not name or not email or not password:
        flash("All fields are required!")
        return redirect(url_for('loginyt'))

    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
        conn.commit()
        flash("Registration successful! Please log in.")
    except sqlite3.IntegrityError:
        flash("Email already registered. Please log in.")
    finally:
        conn.close()

    return redirect(url_for('loginyt'))

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        flash("Please enter both email and password.")
        return redirect(url_for('loginyt'))

    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

    if user and check_password_hash(user['password'], password):
        session['user'] = user['email']
        flash("Login successful!")
        return redirect(url_for('afterlogin'))
    else:
        flash("Invalid email or password.")
        return redirect(url_for('loginyt'))

    conn.close()

    if user:
        session['user'] = user['email']
        flash("Login successful!")
        return redirect(url_for('afterlogin'))
    else:
        flash("Invalid email or password.")
        return redirect(url_for('loginyt'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("You have been logged out.")
    return redirect(url_for('loginyt'))

@app.route('/afterlogin')
def afterlogin():
    if 'user' not in session:
        flash("Please log in to continue.")
        return redirect(url_for('loginyt'))
    return render_template('afterlogin.html', user=session['user'])

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message", "")
    print("📥 Message received from frontend:", user_input)
    
    is_logged_in = 'user' in session
    print("🔐 User logged in?", is_logged_in)
    
    response = chatbot.handle_user_input(user_input, is_logged_in)
    print("🤖 Chatbot response:", response)

    return jsonify({"response": response})

# -------------------- RUN SERVER --------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
