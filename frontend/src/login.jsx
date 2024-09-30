import './login.css';
  
function App() {

return (
    
    <div id="login-container">
        <div id="form-container">
            <form className="login-form">
                <p className="input-field">
                    <label for="email">Email address:</label>
                    <input type="text" name="email" id="email" />
                </p>
                <p className="input-field">
                    <label for="password">Password:</label>
                    <input type="password" name="Password" id="Password" />
                </p>
                <p className="input-field">
                    <button type="button">login</button>
                </p>
                <p className="login-prompt">
                    New user? <a href="/login" className="login-link">Register</a>
                </p>
            </form>
        </div>
       
        <div id="image-container">
        <img src="src/assets/local.jpg" alt="Featured Product" className="image-container" />
        </div>
        
    </div>
);

}
  
export default App;