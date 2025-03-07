import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "./product.model";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  
  read(pageIndex: number = 1, pageSize: number = 10): Observable<{ products: Product[], total: number }> {
    const url = `${this.baseUrl}?_page=${pageIndex}&_limit=${pageSize}`;
    return this.http.get<Product[]>(url, { observe: 'response' }).pipe(
      map(response => {
        const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        return { products: response.body || [], total }; // Retorna o objeto com os produtos e o total
      }),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`; //atenção as crases ``
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );;
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );;
  }
  
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );;
  }
  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }
}
