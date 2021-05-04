
# import python libraries for strings and random string generator
import string
import random

# define variables to use imported module methods
letters = string.ascii_letters
digits = string.digits

# function to return randomly generated string
def salt():
    return ''.join(random.choice(letters + digits) for i in range(20))