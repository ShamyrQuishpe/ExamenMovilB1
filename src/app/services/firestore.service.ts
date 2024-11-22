import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore); // Inyectar Firestore

  constructor() {}

  // Función para guardar múltiples libros en Firestore
  async saveBook(bookData: { title: string; imageUrl: string }) {
    try {
      const booksCollection = collection(this.firestore, 'books'); // Crear la referencia a la colección 'books'
      await addDoc(booksCollection, bookData); // Guardar el libro individual
      console.log('Libro guardado en Firestore');
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  }
}
