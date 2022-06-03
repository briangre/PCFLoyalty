# PCFLoyalty

This is my second PCF control that uses React. (I'm still learning)... with this PCF 
control you can replace an option set of "bronze", "silver", "gold", and "platinum", 
with images representing each level. 

The control will dim the non-selected levels and allow the user to change the current 
level by clicking on the new, desired level.

You will find both a managed and unmanaged solution package in the LoyaltySolution/bin
folder. Debug contains the unmanaged solution and Release contains the managed solution.

The images used in this control are believed to be public domain, but can be replaced 
with other images as desired.

Please feel free to offer suggestions or constructive comments as we are all on this 
journey of learning and living!

The biggest challenge I faced with this control was the async nature of React and the 
PCF calls to getResource() for the images. I had a lot of help from one of my co-workers, 
Danko Kozar, on the aync/await pattern that was needed.  Thank You!

