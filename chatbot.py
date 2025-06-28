import nltk
from nltk.chat.util import Chat, reflections
import requests
from spellchecker import SpellChecker
from textblob import TextBlob
import sqlite3
import re

# Download NLTK data
nltk.download('punkt')

# Spell checker
spell = SpellChecker()

# Defined pairs of patterns and responses
pairs = [
    [r"(hi|hello|hey)", [
        "Hello! How may I help you?", 
        "Hi there! How can I assist you today?", 
        "Hey! Welcome to Voulentree!"
    ]],
    
    [r"(.*)(what is|what's|tell me about)\s+voulentree(.*)",[
        "Voulentree is a platform that connects volunteers with NGOs to collaborate on meaningful causes, events, and fundraisers."
    ]],
    
    [r"(.*) why (.*) use (.*)", [
        "Voulentree helps you find causes you care about, track your impact, and earn certificates and badges while making a difference."
    ]],

    [r"(.*) unique (.*)", [
        "Voulentree empowers users by offering verified volunteering history, leadership through fundraisers, and gamified rewards like badges."
    ]],

    [r"(.*) how (.*) register (.*)", [
        "Just click 'Register' and select your role and details. One account works whether you're a volunteer or an NGO."
    ]],

    [r"(.*) who can join (.*)", [
        "Anyone! Whether you're an individual looking to volunteer or an organization needing help, you can join Voulentree."
    ]],

    [r"(.*) is volunteering (.*) free (.*)", [
        "Yes, volunteering through Voulentree is completely free for everyone."
    ]],

    [r"(.*) remote volunteering (.*)", [
        "Yes! Many NGOs offer remote volunteering options. Filter them when searching for opportunities."
    ]],

    [r"(.*) location based (.*)", [
        "Yes, you can find NGOs and events near your location using our search filters."
    ]],

    [r"(.*) type (.*) causes (.*)", [
        "You can volunteer for education, environment, healthcare, animal welfare, and more."
    ]],

    [r"(.*) get certificate (.*)", [
        "Yes! NGOs can issue certificates directly through the platform once you complete your volunteering."
    ]],

    [r"(.*) how (.*) badges (.*)", [
        "You earn badges for volunteering hours, successful events, fundraisers, and feedback from NGOs."
    ]],

    [r"(.*) create fundraiser (.*)", [
        "Yes, volunteers can start their own fundraisers for supported causes from the dashboard."
    ]],

    [r"(.*) track my impact (.*)", [
        "Your profile shows volunteering hours, badges, causes supported, and certificates earned."
    ]],

    [r"(.*) verified NGO (.*)", [
        "Verified NGOs have been reviewed by our team and display a special verified badge."
    ]],

    [r"(.*) trust (.*) NGO (.*)", [
        "We review all NGO registrations. Verified NGOs are marked and feedback from volunteers is visible too."
    ]],

    [r"(.*) NGO (.*) post (.*) opportunity (.*)", [
        "Yes! NGOs can post events, volunteer calls, or fundraising needs through their dashboard."
    ]],

    [r"(.*) profile (.*) edit (.*)", [
        "You can edit your name, interests, skills, and more in the Profile section after logging in."
    ]],

    [r"(.*) delete account (.*)", [
        "Yes. Go to Profile Settings > Delete Account to remove your profile and all associated data."
    ]],

    [r"(.*) forgot password (.*)", [
        "Click on 'Forgot Password' at login and follow the steps to reset your password."
    ]],

    [r"(.*) certificate (.*) not received (.*)", [
        "Please check with the NGO who organized the event. They are responsible for issuing certificates."
    ]],

    [r"(.*) how (.*) find events (.*)", [
        "Use the search feature to explore volunteering events, causes, and NGOs by interest or location."
    ]],

    [r"(.*) fundraiser (.*) approved (.*)", [
        "Our team reviews all fundraiser requests before approval to ensure safety and authenticity."
    ]],

    [r"(.*) delete fundraiser (.*)", [
        "Go to your dashboard > Fundraisers > Delete. This will permanently remove your campaign."
    ]],

    [r"(.*) NGO (.*) track volunteers (.*)", [
        "NGOs can see volunteer applications, approve them, and track hours via their dashboard."
    ]],

    [r"(.*) feedback (.*) NGO (.*)", [
        "Yes, after completing an event, volunteers can leave feedback on their experience with the NGO."
    ]],

    [r"(.*) how (.*) contact NGO (.*)", [
        "Click on an NGO's profile or event to find their contact information or send a direct message."
    ]],

    [r"(.*) safe (.*) platform (.*)", [
        "Yes. We value your privacy and use encryption and strict verification protocols for safety."
    ]],

    [r"(.*) NGO (.*) verified (.*)", [
        "Verified NGOs go through a verification process where we review their official documents and legitimacy."
    ]],
    
    [r"who is your boyfriend",[
        "obv, Zaid Pathan... The one and only Zaid Pathan"
    ]],

    [r"(.*)voulentree(.*)",[
        "Voulentree is a platform where volunteers and NGOs come together to make an impact in society!"
    ]],

    [r"(.*)", [
        "I'm here to help! You can ask about volunteering, fundraisers, NGO support, badges, or your account."
    ]]
    
]

# Function to correct typos
def correct_typos(text):
    words = text.split()
    corrected_words = []
    for word in words:
        correction = spell.correction(word)
        corrected_words.append(correction if correction is not None else word)
    return ' '.join(corrected_words)

# Create Chatbot
chatbot = Chat(pairs, reflections)

# search from data base
def query_opportunities(location=None, cause=None):
    conn = sqlite3.connect('voulentree.db')
    cursor = conn.cursor()
    
    query = "SELECT title, ngo_name FROM opportunities WHERE 1=1"
    args = []

    if location:
        query += " AND location LIKE ?"
        args.append(f"%{location}%")
    if cause:
        query += " AND cause LIKE ?"
        args.append(f"%{cause}%")

    cursor.execute(query, args)
    results = cursor.fetchall()
    conn.close()
    return results

def query_volunteers_for_opportunity(title):
    conn = sqlite3.connect('voulentree.db')
    cursor = conn.cursor()

    cursor.execute("""
        SELECT v.name FROM volunteers_applied v
        JOIN opportunities o ON v.opportunity_id = o.id
        WHERE o.title LIKE ?
    """, (f"%{title}%",))
    results = cursor.fetchall()
    conn.close()
    return results

# to handle user input
def handle_user_input(user_input, is_logged_in=False):
    print("📨 Original input from user:", user_input)
    
    original_input = user_input.lower()  # preserve original input
    corrected_input = correct_typos(original_input)
    print("✅ Corrected input:", corrected_input)

    # If trying to access database features without logging in
    needs_login_keywords = ["opportunity", "event", "who applied", "volunteer for", "show me", "find cause"]

    if any(kw in original_input for kw in needs_login_keywords) and not is_logged_in:
        print("🚫 Access denied: user not logged in for DB-related query")
        return "Please log in to access opportunities and volunteer data."

    # If asking for opportunities
    if "opportunity" in original_input or "event" in original_input:
        print("🔍 Searching for opportunities...")
        loc_match = re.search(r"(?:in|at)\s+([a-zA-Z\s]+)", original_input)
        cause_match = re.search(r"(?:cause|about|for)\s+([a-zA-Z\s]+)", original_input)

        location = loc_match.group(1).strip() if loc_match else None
        cause = cause_match.group(1).strip() if cause_match else None

        print(f"📌 Parsed Location: {location}")
        print(f"📌 Parsed Cause: {cause}")

        opportunities = query_opportunities(location, cause)
        if opportunities:
            print("✅ Found opportunities in DB")
            return "Here are some matching opportunities:\n" + "\n".join([f"- {o[0]} (by {o[1]})" for o in opportunities])
        else:
            print("❌ No matching opportunities found")
            return "Sorry, no opportunities found matching your query."

    # If asking for who applied
    if "who applied" in original_input:
        print("🔎 Looking up volunteers for opportunity")
        title_match = re.search(r"for\s+(.+)", original_input)
        if title_match:
            title = title_match.group(1).strip()
            volunteers = query_volunteers_for_opportunity(title)
            if volunteers:
                return f"Volunteers who applied for {title}:\n" + "\n".join([f"- {v[0]}" for v in volunteers])
            else:
                return f"No volunteers found for {title}."

    # If none of the above matched, use pre-defined rules
    print("🤖 Falling back to predefined chatbot responses")
    return chatbot.respond(corrected_input)
