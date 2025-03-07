import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "./../product.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  totalItems: number = 0;
  displayedColumns: string[] = ["id", "name", "price", "action"];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(
    this.products
  );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(1, 10);
  }

  loadProducts(pageIndex: number, pageSize: number): void {
    this.productService.read(pageIndex, pageSize).subscribe((response) => {
      this.products = response.products;
      this.totalItems = response.total;
      this.dataSource.data = this.products;

      if (this.paginator) {
        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = pageIndex - 1;
        this.paginator.pageSize = pageSize;
      }
    });
  }

  onPageChange(event): void {
    this.loadProducts(event.pageIndex + 1, event.pageSize);
  }
}
