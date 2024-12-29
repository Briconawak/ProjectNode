import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  title = "Acceuil"
  searchTerm: string = '';
  products = [
    { nom: 'Produit 1', image: 'Image P1', descriptif: 'Descriptif 1', quantity: 0, price: 10.5, type: 'décoration', promotion: 20 },
    { nom: 'Produit 2', image: 'Image P2', descriptif: 'Descriptif 2', quantity: 0, price: 5.99, type: 'alimentaire', promotion: 0 },
    { nom: 'Produit 3', image: 'Image P3', descriptif: 'Descriptif 3', quantity: 0, price: 20.0, type: 'décoration', promotion: 10 },
    { nom: 'Produit 4', image: 'Image P4', descriptif: 'Descriptif 4', quantity: 0, price: 2.5, type: 'autre', promotion: 0 },
  ];
  filteredProducts = [...this.products];
  cart: any[] = [];
  showFilter: boolean = false;
  showCart: boolean = false;
  filterCriteria = { type: 'all', sort: 'none', promo: 'all' };

  // Calculer le prix final d'un produit en tenant compte de la promotion
  getFinalPrice(product: any): number {
    if (product.promotion > 0) {
      return product.price * (1 - product.promotion / 100);
    }
    return product.price;
  }

  // Synchronisation du nombre total d'articles dans le panier
  getTotalItemsInCart() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Ajouter un produit
  addToCart(product: any) {
    product.quantity++;
    const itemInCart = this.cart.find((item) => item.nom === product.nom);
    if (itemInCart) {
      itemInCart.quantity = product.quantity;
      itemInCart.finalPrice = this.getFinalPrice(product);
    } else {
      this.cart.push({
        ...product,
        finalPrice: this.getFinalPrice(product),
      });
    }
  }

  // Retirer un produit
  removeFromCart(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      const itemInCart = this.cart.find((item) => item.nom === product.nom);
      if (itemInCart) {
        itemInCart.quantity = product.quantity;
        if (itemInCart.quantity === 0) {
          this.cart = this.cart.filter((item) => item.nom !== product.nom);
        }
      }
    }
  }

  // Synchroniser les quantités lorsqu'on modifie directement le panier
  updateProductFromCart(cartItem: any, change: number) {
    const productInList = this.products.find((product) => product.nom === cartItem.nom);
    if (productInList) {
      productInList.quantity += change;
      if (productInList.quantity < 0) {
        productInList.quantity = 0;
      }

      cartItem.quantity = productInList.quantity;
      if (cartItem.quantity === 0) {
        this.cart = this.cart.filter((item) => item.nom !== cartItem.nom);
      }
    }
  }

  // Obtenir le prix total du panier
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.quantity * item.finalPrice, 0).toFixed(2);
  }

  // Basculer l'affichage du filtre
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  // Basculer l'affichage du panier
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Appliquer les filtres à la liste des produits
  filterProducts() {
    this.filteredProducts = this.products
      .filter((product) =>
        this.filterCriteria.type === 'all' || product.type === this.filterCriteria.type
      )
      .filter((product) =>
        this.filterCriteria.promo === 'all' || (this.filterCriteria.promo === 'promo' && product.promotion > 0)
      )
      .filter((product) =>
        product.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    if (this.filterCriteria.sort === 'asc') {
      this.filteredProducts.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));
    } else if (this.filterCriteria.sort === 'desc') {
      this.filteredProducts.sort((a, b) => this.getFinalPrice(b) - this.getFinalPrice(a));
    }
  }

  // Mise à jour du filtre par type
  updateTypeFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterCriteria.type = value;
    this.filterProducts();
  }

  // Mise à jour du tri par prix
  updateSortFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterCriteria.sort = value;
    this.filterProducts();
  }

  // Mise à jour du filtre par promotion
  updatePromoFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterCriteria.promo = value;
    this.filterProducts();
  }
}
