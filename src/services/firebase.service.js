import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    collection,
    getDocs,
    addDoc
} from "firebase/firestore/lite";
import { auth, db } from "../../environment";


/**
 * Creates a new user in Firebase Authentication and Firestore
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export async function createUser(name, email, uid) {
    try {

        // 2. Store additional user info in Firestore

        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            uid: uid,
            email: email,
            name: name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            cartProducts: []
        });

        console.log("User created and saved in Firestore:", uid);
        return user;
    } catch (error) {
        console.error("Error during user creation:", error.message);
        throw error;
    }
}






export async function addCartProducts(product) {
    try {
        const uid = localStorage.getItem("uid");
        if (!uid) {
            alert("Please login to add items to cart");
            return;
        }
        // fetch user first
        const user = await getDoc(doc(db, 'users', uid));

        // fetch cartProducts Array
        const cartProducts = user.exists() ? (user.data().cartProducts || []) : [];

        // add new item in array
        cartProducts.push(product);

        // set that array in user document
        await updateDoc(doc(db, 'users', uid), {
            cartProducts
        })

    } catch (error) {
        console.error(error);
    }
}

export async function removeCartProduct(productId) {
    try {
        const uid = localStorage.getItem("uid");
        if (!uid) return;

        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            let cartProducts = userSnap.data().cartProducts || [];

            // Remove only one instance of the product
            const index = cartProducts.indexOf(productId);
            if (index > -1) {
                cartProducts.splice(index, 1);

                await updateDoc(userRef, {
                    cartProducts
                });
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error removing from cart:", error);
        return false;
    }
}

/**
 * Gets the cart products for a given user
 * @returns {Array} cartProducts
 */
export const getCartProducts = async () => {
    try {
        // 1. Get UID from localStorage
        const uid = localStorage.getItem("uid");
        if (!uid) {
            console.error("UID not found in localStorage");
            return [];
        }
        console.log("UID:", uid);

        // 2. Get user document
        const snapshot = await getDoc(doc(db, "users", uid));
        const user = snapshot.data();
        console.log("User snapshot data:", user);

        if (!user) {
            console.error("User document not found");
            return [];
        }

        // 3. Get cart product IDs
        const cartProductIds = Array.isArray(user.cartProducts) ? user.cartProducts : [];
        console.log("Cart Product IDs:", cartProductIds);

        if (cartProductIds.length === 0) {
            console.log("No products in cart");
            return [];
        }

        // 4. Fetch all product documents concurrently
        const productPromises = cartProductIds.map(id => getDoc(doc(db, "product", id)));
        const productSnapshots = await Promise.all(productPromises);

        // 5. Debug snapshot status
        console.log("Product Snapshots:", productSnapshots.map(snap => ({
            id: snap.id,
            exists: snap.exists()
        })));

        // 6. Build product array from existing snapshots
        const productArray = productSnapshots
            .filter(snap => snap.exists())
            .map(snap => ({ id: snap.id, ...snap.data() }));

        console.log("Fetched products:", productArray);
        return productArray;

    } catch (error) {
        console.error("Error fetching cart products:", error);
        return [];
    }
};




// Imports consolidated at the top
/**
 * Fetches all products from the "products" collection
 */
export async function fetchAllProducts() {
    try {
        const productsCol = collection(db, "product");
        const snapshot = await getDocs(productsCol);
        const productList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return productList;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error;
    }
}

export async function addProduct(product) {
    try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const nextId = (querySnapshot.size + 1).toString();

        await setDoc(doc(db, "product", nextId), {
            ...product,
            id: nextId,
            createdAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error adding product:", error);
        return false;
    }
}

export async function deleteProduct(id) {
    try {
        await deleteDoc(doc(db, "product", id));
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
}

export async function updateProduct(id, updatedData) {
    try {
        const productRef = doc(db, "product", id);
        await setDoc(productRef, updatedData, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating product:", error);
        return false;
    }
}







export async function saveContactedUser(name, email, contact, comment) {
    try {
        console.log("Checking collection size for sequential ID...");
        const querySnapshot = await getDocs(collection(db, "contactedUser"));
        const nextId = (querySnapshot.size + 1).toString();

        console.log("Saving contact as ID:", nextId);

        await setDoc(doc(db, "contactedUser", nextId), {
            name,
            email,
            contact,
            comment,
            createdAt: new Date().toISOString()
        });

        return nextId; // Return the ID for feedback
    } catch (error) {
        console.error("Error saving contact:", error.message);
        throw error;
    }
}

/**
 * Places an order by creating a document in 'orders' collection and clearing the user's cart.
 */
export async function placeOrder(userId, shippingDetails, cartProducts, totalAmount) {
    try {
        if (!userId) throw new Error("User ID required");

        const querySnapshot = await getDocs(collection(db, "orders"));
        const orderId = (querySnapshot.size + 1).toString();

        await setDoc(doc(db, "orders", orderId), {
            userId,
            shippingDetails,
            items: cartProducts,
            totalAmount,
            status: "pending",
            createdAt: new Date().toISOString()
        });

        console.log("Order placed successfully, ID:", orderId);

        // 2. Clear the User's Cart
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            cartProducts: [] // Empty the array
        });

        return true;
    } catch (error) {
        console.error("Error placing order:", error);
        return false;
    }
}



