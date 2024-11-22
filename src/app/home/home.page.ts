import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imagesWithTitles: { imageUrl: string; title: string }[] = []; // Arreglo para almacenar imágenes y títulos
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private firestoreService: FirestoreService // Inyecta el servicio Firestore
  ) {}

  home() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  async fetchRandomImagesWithTitles() {
    this.loading = true;
    this.imagesWithTitles = []; // Reiniciar el arreglo

    const promises = Array.from({ length: 10 }, async () => {
      const randomId = Math.floor(Math.random() * 50) + 1; // ID aleatorio entre 1 y 50
      const randomValue = Math.random().toString(36).substring(2, 10); // Valor aleatorio para la imagen
      const imageUrl = `https://robohash.org/${randomValue}`;

      try {
        const book = await this.http
          .get<any>(`https://gutendex.com/books/?ids=${randomId}`)
          .toPromise();
        const title = book.results[0]?.title || 'Unknown Title'; // Obtener el título del libro o asignar "Unknown Title"
        return { imageUrl, title };
      } catch (error) {
        console.error(error);
        return { imageUrl, title: 'Unknown Title' };
      }
    });

    this.imagesWithTitles = await Promise.all(promises);
    this.loading = false;
  }

  // Función para guardar todos los libros y sus URLs en Firestore
  async saveAllBooksToFirestore() {
    try {
      const bookData = this.imagesWithTitles.map(item => ({
        title: item.title,
        imageUrl: item.imageUrl
      }));
  
      // Iterar sobre cada libro y guardarlo
      for (const book of bookData) {
        await this.firestoreService.saveBook(book); // Guardar cada libro de forma individual
      }
  
      console.log('Todos los libros guardados correctamente');
    } catch (error) {
      console.error('Error al guardar los libros:', error);
    }
  }
}
