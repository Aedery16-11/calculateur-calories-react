const BASE_URL = 'http://localhost:3000';
const TEST_USER = { email: `test-${Date.now()}@demo.com`, password: "123" };
const TEST_BURGER = { label: "Test Burger", qtyCalory: 500, category: "repas" };

async function runTests() {
    let token = "";
    let createdId = "";

    console.log("🚀 Démarrage des tests QA...");

    try {
        // 1. Inscription (Signup)
        console.log("\n1️⃣ Inscription (POST /auth/signup)...");
        const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });
        const signupData = await signupRes.json();
        if (signupRes.ok) console.log("✅ SUCCÈS : Utilisateur inscrit");
        else throw new Error(`ÉCHEC : ${JSON.stringify(signupData)}`);

        // 2. Connexion (Login)
        console.log("\n2️⃣ Connexion (POST /auth/login)...");
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });
        const loginData = await loginRes.json();
        token = loginData.token;
        if (token) console.log("✅ SUCCÈS : Token récupéré");
        else throw new Error("ÉCHEC : Pas de token reçu");

        const authHeader = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

        // 3. Ajout (Create)
        console.log("\n3️⃣ Ajout d'une calorie (POST /calories)...");
        const createRes = await fetch(`${BASE_URL}/calories`, {
            method: 'POST',
            headers: authHeader,
            body: JSON.stringify(TEST_BURGER)
        });
        const createdItem = await createRes.json();
        createdId = createdItem._id;
        if (createdId) console.log(`✅ SUCCÈS : Élément créé avec ID ${createdId}`);
        else throw new Error("ÉCHEC : L'élément n'a pas été créé");

        // 4. Vérification (Read)
        console.log("\n4️⃣ Vérification (GET /calories)...");
        const listRes = await fetch(`${BASE_URL}/calories`, { headers: authHeader });
        const list = await listRes.json();
        const found = list.find(item => item._id === createdId);
        if (found) console.log(`✅ SUCCÈS : "${found.label}" est bien présent`);
        else throw new Error("ÉCHEC : Élément introuvable dans la liste");

        // 5. Suppression (Delete)
        console.log(`\n5️⃣ Suppression (DELETE /calories/${createdId})...`);
        const deleteRes = await fetch(`${BASE_URL}/calories/${createdId}`, {
            method: 'DELETE',
            headers: authHeader
        });
        if (deleteRes.ok) console.log("✅ SUCCÈS : Requête de suppression envoyée");
        else throw new Error("ÉCHEC : Erreur lors de la suppression");

        // 6. Confirmation finale
        console.log("\n6️⃣ Confirmation finale (GET /calories)...");
        const finalCheckRes = await fetch(`${BASE_URL}/calories`, { headers: authHeader });
        const finalList = await finalCheckRes.json();
        const stillExists = finalList.find(item => item._id === createdId);
        if (!stillExists) console.log("✅ SUCCÈS : L'élément a disparu. Test terminé avec succès !");
        else throw new Error("ÉCHEC : L'élément existe encore après suppression");

    } catch (error) {
        console.error(`\n❌ ÉCHEC CRITIQUE : ${error.message}`);
        process.exit(1);
    }
}

runTests();