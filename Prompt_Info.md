I want to first design the home page :

Use the uploaded image as inspiration to create the Hero section.
    - Use the images from the testimonial_carousel folder 
    - Add three navigation buttons About Us, Meet the Bears, Carts (No need to route them anywhere yet, just make them responsive to clicks )
    - Add a "Shop BlindBoxes" button in the hero section which redirects to the blindboxes page. 
    - There should be an image carousel underneath the Hero section that constantly moves through 
    
____________________________________________________________________________________________
I want to design the Shop Blindbox page 
- Keep the sticky Navigation 
- The first section should be buttons navigation to the various collections. Currently we only have "Valentine's Day Collection" so keep the other collections faded and "comming soon"

- The next section will be for BlindBox Products 
    - Under this container, add two products :
        - Valentine's Day Blind Box 
        - Valentine's Day Blind Box Couple Package 
    - Use the images in the products folder 
    - Add the prices as well as shown on the image 

- Make clicks to these products responsive, but no need to redirect yet. 
- Use the uploaded image for inspiration 

____________________________________________________________________________________________

I updated the images directory for the products. Update the relevant image paths to the new image paths  
____________________________________________________________________________________________


Now I want to design the "Product Detail" page. 

For each product, I want it to go to a product detail page with the appropriate information 

- There will be a image section on the left where there will be a collage of images in the respective product's image folder 
- On the right will be information regarding the product : 
    - Name of the product 
    - Whether it is in stock or not 
    - Price 
    - The quantity they of the product they want to add to cart : default on 1 
    - Add to card button 
    - Description of the product 

Use the uploaded image as inspiration. 

For now just hardcode the following product information, in the future it will be connected to a backend database. 

Name of the product  : Valentine's Day Blind Box : 
    - Whether it is in stock or not : Currently In Stock
    - Price : 20.00 CAD
    - Description of the product : 
        Get any of the following bears: 
            - Bingsu 
            - Pip
            - Powda 
            - Sunset 

Name of the product  : Valentine's Day Blind Box Couples Package: 
    - Whether it is in stock or not : Currently In Stock
    - Price : 35.00 CAD
    - Description of the product : 
        Get any of the following bears: 
            - Bingsu 
            - Pip
            - Powda 
            - Sunset 


____________________________________________________________________________________________

I want to implement a pop up screen when the user clicks "add to cart". There should be two buttons "view cart" or "continue shopping". The cart should also have a value icon on it to indicate how many items are in their cart currently.

____________________________________________________________________________________________

Now I want to implement the cart page 

- On the left side, I want a section showing all the items the user chose to add to cart, along with the quantity. 
- On the right side there will be a section for order information 
- Here the user will have to input their email and phone number first 
- Then they will have to choose a pickup and time slot
    - Right now just hardcode the dates and times slots 
    - There is also a confirm button for them to confirm their location and times slot

- Then there will be a section to upload a file (pdf, png, jpg and other popular image formats). 
- And the last section will be the order summary stating the total price of their products 
- They are only able to click the check out buttone once they have entered their contact, confirmed their time and location and uploaded a file for proof of transaction. The checkout button should remain faded until they've completed it. 

Use the uploaded image for reference 

____________________________________________________________________________________________

Fix time slot funcitonality and data types. TO make sure time is tied to location