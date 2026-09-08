 const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// In-memory campus emergency database
const emergencyContacts = [
    { type: "Fire", contact: "Campus Fire Safety Desk", phone: "555-0191", location: "Building A - Ground Floor" },
    { type: "Medical", contact: "Health & First Aid Center", phone: "555-0192", location: "Student Center - Room 102" },
    { type: "Security", contact: "Main Gate Security HQ", phone: "555-0193", location: "Main Gate Gatehouse" },
    { type: "Disaster", contact: "Disaster Response Control", phone: "555-0194", location: "Administrative Block" }
];

const activeIncidents = [];

function displayMenu() {
    console.log("\n=============================================");
    console.log("     CAMPUS EMERGENCY COORDINATOR CONSOLE    ");
    console.log("=============================================");
    console.log("1. Report an Incident");
    console.log("2. View Emergency Response Contacts");
    console.log("3. View Active Campus Incidents");
    console.log("4. Broadcast Emergency Alert");
    console.log("5. Exit Console");
    console.log("=============================================");
    rl.question("Select an option (1-5): ", handleMenuChoice);
}

function handleMenuChoice(choice) {
    switch (choice.trim()) {
        case '1':
            reportIncident();
            break;
        case '2':
            viewContacts();
            break;
        case '3':
            viewIncidents();
            break;
        case '4':
            broadcastAlert();
            break;
        case '5':
            console.log("\nExiting Campus Emergency Coordinator Console. Stay safe!");
            rl.close();
            break;
        default:
            console.log("\n[!] Invalid selection. Please enter a number from 1 to 5.");
            displayMenu();
            break;
    }
}

function reportIncident() {
    console.log("\n--- REPORT NEW EMERGENCY ---");
    rl.question("Incident Category (Fire / Medical / Security / Disaster): ", (type) => {
        rl.question("Exact Location on Campus: ", (location) => {
            rl.question("Brief Description of the Incident: ", (description) => {
                const id = activeIncidents.length + 1;
                const timestamp = new Date().toLocaleTimeString();
                
                const newIncident = {
                    id,
                    type,
                    location,
                    description,
                    time: timestamp,
                    status: "Assigned to Response Team"
                };

                activeIncidents.push(newIncident);
                console.log(`\n[SUCCESS] Emergency Incident #${id} logged at ${timestamp}. Response team dispatched!`);
                displayMenu();
            });
        });
    });
}

function viewContacts() {
    console.log("\n--- CAMPUS EMERGENCY DIRECTORY ---");
    emergencyContacts.forEach((item, index) => {
        console.log(`${index + 1}. [${item.type}] ${item.contact} | Phone: ${item.phone} | HQ: ${item.location}`);
    });
    displayMenu();
}

function viewIncidents() {
    console.log("\n--- ACTIVE CAMPUS INCIDENTS ---");
    if (activeIncidents.length === 0) {
        console.log("No active emergency incidents reported.");
    } else {
        activeIncidents.forEach((inc) => {
            console.log(`[ID #${inc.id}] Type: ${inc.type} | Location: ${inc.location} | Time: ${inc.time} | Status: ${inc.status}`);
            console.log(`   Details: ${inc.description}`);
        });
    }
    displayMenu();
}

function broadcastAlert() {
    console.log("\n--- BROADCAST EMERGENCY ALERT ---");
    rl.question("Enter Emergency Message to Broadcast: ", (message) => {
        console.log(`\n[BROADCAST SENT]: ALL CAMPUS UNITS ALERTED -> "${message.toUpperCase()}"`);
        displayMenu();
    });
}

// Start program
displayMenu();