# Project : Node & React Development
## Chapter 1 : The setup

For our project, using a PostgreSQL database is mandatory.

To setup the database you need to follow these instruction :

When you create the database, enter the name `projet_node` and after, click on *Connection*.

<img src="picture/tutorial_setup_database_1.png" width="500" />

You need to write the Host name/adress `localhost`, write your password (and enable `Save Password?` if you want) and then click on `Save`.

<img src="picture/tutorial_setup_database_2.png" width="500" />

After clicking on `Save` you should see the icon with `projet_node` appear, left click on `projet_node`. Select *Create* and `Login/Group Role...`.

<img src="picture/tutorial_setup_database_3.png" width="500" />

Now, enter the name `projet_node_user` and then click on `Definition`

<img src="picture/tutorial_setup_database_4.png" width="500" />

Enter the Password `1234` (this password and not another), and then click on `Privileges`.

<img src="picture/tutorial_setup_database_5.png" width="500" />

Here you need to enable every privileges, and after click on `Save`.

<img src="picture/tutorial_setup_database_6.png" width="500" />

Right click on the icon named `projet_node`. Click on `Create` and `Database...`.

<img src="picture/tutorial_setup_database_7.png" width="500" />

Write for the Database's name `projet_node_db`, select `projet_node_user` for the Owner of the database. Click on `Save`.

<img src="picture/tutorial_setup_database_8.png" width="500" />

Now you need to open the file [Backend](https://github.com/Briconawak/ProjectNode/tree/main/Backend) on IntelliJ IDEA.

Run the file [app.ts](https://github.com/Briconawak/ProjectNode/blob/main/Backend/Backend/src/app.ts).

Normally, you should have the same message in the terminal.

<img src="picture/tutorial_setup_backend.png" width="900" />

(Think to make a `npm install` if you didn't made it)

Now the last step is, using the cmd, going in the file [Frontend](https://github.com/Briconawak/ProjectNode/tree/main/Frontend) and start the website unsing the command `ng serve`.

<img src="picture/tutorial_setup_frontend.png" width="700" />

Finally, go to [this link](http://localhost:4200) to end on the website.

## Chapter 2 : Presentation of the website

We created a website for online sales.

<img src="picture/website.png" width="1000" />

When you click on *Ajouter au panier*, the item is added in the basket. You can also add or remove items from the basket, and it's showing the total price.

<img src="picture/basket.png" width="1000" />

You can also research a product by his name.

<img src="picture/research.png" width="1000" />

We implemented a filter to allow you to filter by Category, by asc/desc price or by promo.

<img src="picture/filter.png" width="600" />
<div style="display: flex;">
  <img src="picture/filter1.png" width="197" style="margin-right: 10px;"/>
  <img src="picture/filter2.png" width="278" style="margin-right: 10px;"/>
  <img src="picture/filter3.png" width="280">
</div>

