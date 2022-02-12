from playsound import playsound
import random

num = 5 # to be replaced

# To randomly allot each note to a given gesture
# This allotment shuffles for each user session
li = random.sample(range(10), 10) 
#print(li)

# Sample tunes stored
s = ["Finguitar/music-test/tunes/tune1.wav","Finguitar/music-test/tunes/tune2.wav","Finguitar/music-test/tunes/tune3.wav","Finguitar/music-test/tunes/tune4.wav","Finguitar/music-test/tunes/tune5.wav","Finguitar/music-test/tunes/tune6.wav","Finguitar/music-test/tunes/tune7.wav","Finguitar/music-test/tunes/tune8.wav","Finguitar/music-test/tunes/tune9.wav","Finguitar/music-test/tunes/tune10.wav"]
#for i in li:
playsound(s[li[num]])
#playsound(s[li[num-1]])