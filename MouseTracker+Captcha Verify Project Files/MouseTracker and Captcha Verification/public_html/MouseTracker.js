/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

=
            <!-- Tracks mouse movement, event found in console when inspecting -->
            public static boolean checkMouse(var mouseX, var mouseY)
            {
                if (mouseX != 0 || mouseY != 0)
                {
                    return true;
                }
                else 
                {
                    return false;
                }
            } 