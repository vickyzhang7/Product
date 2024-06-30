# React-Firebase Project

## Project Overview
This is a cooking recipe website built using React for the front-end and Firebase for the back-end. It allows users to create, read, update, and delete recipes easily. The application features a user-friendly interface, search functionality, and the ability to manage ingredients. With Firebase handling data storage and real-time updates, users can seamlessly manage their favorite recipes.
**Major frameworks and libraries**:

* [![JavaScript][JavaScript-icon]][JavaScript-url]
* [![React][React-icon]][React-url]
* [![HTML][HTML-icon]][HTML-url]
* [![CSS][CSS-icon]][CSS-url]
* [![Firebase][Firebase-icon]][Firebase-url]


[React-url]:https://reactjs.org/
[React-icon]:https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[HTML-url]:https://html.com/
[HTML-icon]:https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[CSS-url]:https://www.css3.com/
[CSS-icon]:https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[JavaScript-url]:https://www.javascript.com/
[JavaScript-icon]:https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[Firebase-url]:https://firebase.google.com/
[Firebase-icon]:https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation and Running

### Front-End (React Application)

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the front-end development server:

   ```sh
   npm start
   ```

### Back-End

1. Install Firebase:

   ```sh
   npm install firebase
   ```
Here's an interface summary for your cooking application, based on the provided screenshots:

## Interface Screenshots

1. **Theme Customization**:
   - Users can customize the theme color of the application, choosing between options like red or dark mode for a personalized interface experience.

     <img width="1410" alt="Screenshot 2024-06-29 at 10 45 37 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/9def2773-424b-41ba-9187-097f0f478a73">
      <img width="1410" alt="Screenshot 2024-06-29 at 10 45 42 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/e3201cdd-704e-4927-b31c-a76de40f7445">

2. **View Recipe**:
   - Clicking "Cook This" expands the recipe details, displaying the full list of ingredients and step-by-step cooking instructions.

     <img width="1410" alt="Screenshot 2024-06-29 at 10 45 21 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/39e24541-be47-41ff-bdb3-3865ea5a0893">
      
3. **Initial Recipe Search**:
   - When users first access the application, they can search for recipes. The search results display the recipe name, cooking time, and a brief description. Users can click "Cook This" to view details or "Edit" to modify the recipe.

     <img width="1410" alt="Screenshot 2024-06-29 at 11 19 23 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/b26f74a5-50ba-4a4f-afa2-dc1a248ce6fa">



4. **Create a New Recipe**:
   - Users can create a new recipe by clicking the "Create Recipe" button. They input the recipe title, ingredients, method, and cooking time. Once filled out, clicking "Submit" adds the recipe to the list.

     <img width="1410" alt="Screenshot 2024-06-29 at 10 47 03 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/2d258733-e457-408a-a519-5b8d2811e8b7">



5. **Edit Recipe**:
   - To edit an existing recipe, users click the "Edit" button. This opens a form with the current recipe details, allowing users to update ingredients, methods, or cooking time.

     <img width="1410" alt="Screenshot 2024-06-29 at 11 14 01 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/99deb8a6-412d-4d39-89de-173b02180569">


6. **Delete Recipe**:
   - Users can delete a recipe by clicking the trash icon. A confirmation dialog appears to ensure the user wants to delete the recipe.

     <img width="1410" alt="Screenshot 2024-06-29 at 10 47 48 PM" src="https://github.com/vickyzhang7/React-Firebase/assets/130918669/15e57f6a-9d01-4951-a095-fb7db5aa1229">





This summary provides an overview of the core functionalities, focusing on recipe management and interface customization.
## Code Improvements

### 1. React Router Update
**Old Version (useHistory)**:
```javascript
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push(`/search?q=${term}`);
```

**New Version (useNavigate)**:
```javascript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate(`/search?q=${search}`);
```
- **Use `useNavigate`**: Simplifies navigation in React Router v6, making code more concise and modern.

### 2. useFetch Hook Optimization
**Old Version**:
```javascript
const fetchData = async () => {
  const res = await fetch(url);
};
```

**New Version**:
```javascript
const controller = new AbortController();
const signal = controller.signal;
const res = await fetch(url, { signal });
```
- **Use `AbortController`**: Manages async operations effectively, preventing memory leaks and unhandled errors.

### 3. Switching from `Switch` to `Routes`
**Old Version**:
```javascript
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
</Switch>
```

**New Version**:
```javascript
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```
- **Use `Routes`**: Enhances code readability and performance in React Router v6.

### 4. Fetching Data on Component Mount
**Old Version**:
```javascript
useEffect(() => {
  fetchData();
}, []);
```

**New Version**:
```javascript
useEffect(() => {
  const unsubscribe = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
    // Update state with new data
  });
  return () => unsubscribe();
}, []);
```
- **Use `onSnapshot`**: Fetches initial data and listens for changes, streamlining the data handling process.


Here’s the updated README format with code improvements:

### 5. Update Function with Modal

**Old Version**:
```javascript
const handleEdit = (recipe) => {
  // Update recipe logic without modal
};
```

**New Version (with Modal)**:
```javascript
const handleEdit = (recipe) => {
  setEditing(recipe.id);
  setUpdatedRecipe({ 
    title: recipe.title, 
    cookingTime: recipe.cookingTime.replace(' minutes', ''), 
    method: recipe.method,
    ingredients: recipe.ingredients 
  });
};

{editing && (
  <div className={`modal ${mode}`}>
    <div className="modal-content">
      <label>
        <span>Recipe Title:</span>
        <input 
          type="text" 
          value={updatedRecipe.title} 
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })} 
        />
      </label>
      {/* Additional form fields for ingredients, method, cooking time */}
      <button onClick={() => handleUpdate(editing)} className="btn">Save</button>
      <button onClick={() => setEditing(null)} className="btn">Cancel</button>
    </div>
  </div>
)}
```

- **Modal Addition**: Added a modal that allows users to edit recipes in an overlay form.
- **Dynamic Modal Styling**: The modal styling adapts based on the `mode`, supporting both light and dark themes.
- **Form Content**: The form content is similar to the creation form, allowing users to modify all fields.
