/* 
 * MouseTracker.js  
 * Created by Christian Lampher 
 * 05/04/2021
 * 
 * This JavaScript file tracks the movement of the user's mouse, making note of 
 * the number of events (times the computer has detected the mouse movement)
 * as well as the X and Y coordinates of the mouse on the web page. The also 
 * returns either true or false under the "mouseDetect" function depending on 
 * whether the mouse is unmoved (undefined or 0).
 */


var xval;  // X Value
var yval;  // X Value
var mouseCounter = 0;
var mousePrev = 0;
            
window.addEventListener('mousemove', function (e) // Listener to fire when mouse movement detected
    {
        // Document element id's for page elements, not needed for code below to function
        document.getElementById('x-value').textContent = e.x;
        document.getElementById('y-value').textContent = e.y;
        document.getElementById('counter').textContent = mouseCounter;
        mouseCounter += 1; // Counts every time a mouse event fires
        xval = e.x; // Sets the mouse X value
        yval = e.y; // Sets the mouse Y value
    });
    
window.setInterval( // Every 1 second
        function checkTheMouse() 
            {
                // Functions from Javascript file MouseTracker.js
                console.clear(); // Clears console at the start of each run
            
                if (mouseDetect(mouseCounter) && (mouseCounter !== mousePrev)) // mousePrev logs the previous mouse position and compares 
                                                                               // against the current position to track whether or not the 
                                                                               // mouse is still moving or not.
                {        
                    console.log('mouse is moving    X: ' + xval + '  Y: ' + yval + '  Mouse Events: ' + mouseCounter); // Add any action here for mouse movement
                    mousePrev = mouseCounter;
                }
                else 
                    console.log('mouse isn\'t moving    X: ' + xval + '  Y: ' + yval + '  Mouse Events: ' + mouseCounter); // Add any action here for no mouse movement
                
            }
            , 500); // Every 500 miliseconds

function mouseDetect(counter)
{
    if (counter !== 0 && counter !== null && counter !== undefined) // If the mouse has moved from it's point at page start
    {
        return true;
    }
    else 
    {
        return false;
    }
};