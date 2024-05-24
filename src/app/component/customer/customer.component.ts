import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app.material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { menupermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  customerlist!: customer[];
  displayedColumns: string[] = ["code", "name", "email", "phone", "creditlimit", "status", "action"];
  datasource: any;
  _response: any;
  _permission: menupermission = {
    code: '',
    name: '',
    haveview: false,
    haveadd: false,
    haveedit: false,
    havedelete: false,
    userrole: '',
    menucode: ''
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: CustomerService, private userservice: UserService, private toastr: ToastrService,
    private router: Router) {

    this.Setaccess();
  }
  ngOnInit(): void {
    this.Loadcustomer();
  }

  Setaccess() {
    let role = localStorage.getItem('userrole') as string;
    this.userservice.Getmenupermission(role, 'customer').subscribe(item => {
      this._permission = item;
    })
  }
  Loadcustomer() {
    this.service.GetAll().subscribe(item => {
      this.customerlist = item;
      this.datasource = new MatTableDataSource<customer>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  functionedit(code: string) {
    if (this._permission.haveedit) {
      this.router.navigateByUrl('/customer/edit/' + code)
    } else {
      this.toastr.warning('User not having edit access', 'warning')
    }
  }
  functiondelete(code: string) {
    if (this._permission.havedelete) {
      if (confirm('Are you sure?')) {
        this.service.Deletecustomer(code).subscribe(item => {
          this._response = item;
          if (this._response.ressult === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.Loadcustomer();
          }
        })
      }
    } else {
      this.toastr.warning('User not having delete access', 'warning')
    }
  }

}
