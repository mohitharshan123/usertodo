import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TodoService } from "../services/todo.service";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  displayedColumns: string[] = ["title", "completed"];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getToDoList();
  }

  getToDoList() {
    const userId = this.route.snapshot.params.id;
    this.todoService.getTodos(userId).subscribe(
      (todos) => {
        this.dataSource = new MatTableDataSource(todos);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
