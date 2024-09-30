
import './signup.css';
  
  function App() {
    return (
      <div id="signup-container">

        <div id="form-container">
          <form className="signup-form">
            
          
            <p className="input-field">
              <label for="Fname">First name:</label>
              <input type="text" name="Fname" id="Fname" />
            </p>

            <p className="input-field">
              <label for="Lname">Last name:</label>
              <input type="text" name="sName" id="Lname" />
            </p>

            <p className="input-field">
              <label for="email">Email address:</label>
              <input type="text" name="email" id="email" />
            </p>

            <p className="input-field">
              <label for="password">Password:</label>
              <input type="password" name="Password" id="Password" />
            </p>
            <p className="input-field">
              <label for="cPassword">Confirm Password:</label>
              <input type="password" name="cPassword" id="cPassword" />
            </p>
        
            <p className="input-field">
             
                <button type="button">Signup</button>
             
            </p>

            <p className="login-prompt">
            Already have an account? <a href="/login" className="login-link">login page</a>
            </p>

          </form>
          </div>

         
          <div id="image-container">
          <img src="src/assets/farmer.jpg" alt="Featured Product" className="image-container" />
          </div>
          
          
        
      </div>

    );
  }
  
  export default App;

