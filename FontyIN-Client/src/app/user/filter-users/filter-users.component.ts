import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/classes/Profile/UserDTO';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-filter-users',
  templateUrl: './filter-users.component.html',
  styleUrls: ['./filter-users.component.css']
})
export class FilterUsersComponent implements OnInit {

  years: Object[] = [
    {value: '1996-1', viewValue: '1996'},
    {value: '1997-2', viewValue: '1997'},
    {value: '1998-3', viewValue: '1998'},
    {value: '1999-4', viewValue: '1999'},
    {value: '2000-5', viewValue: '2000'},
    {value: '2001-6', viewValue: '2001'},
    {value: '2002-7', viewValue: '2002'},
    {value: '2003-8', viewValue: '2003'},
    {value: '2004-9', viewValue: '2004'},
    {value: '2005-10', viewValue: '2005'},
    {value: '2006-11', viewValue: '2006'},
    {value: '2007-12', viewValue: '2007'},
    {value: '2008-13', viewValue: '2008'},
    {value: '2009-14', viewValue: '2009'},
    {value: '2010-15', viewValue: '2010'},
    {value: '2011-16', viewValue: '2011'},
    {value: '2012-17', viewValue: '2012'},
    {value: '2013-18', viewValue: '2013'},
    {value: '2014-19', viewValue: '2014'},
    {value: '2015-20', viewValue: '2015'},
    {value: '2016-21', viewValue: '2016'},
    {value: '2017-22', viewValue: '2017'},
    {value: '2018-23', viewValue: '2018'},
    {value: '2019-24', viewValue: '2019'},
    {value: '2020-25', viewValue: '2020'}
  ];

  departments: Object[] = [
    {value: '1', viewValue: 'ICT'},
    {value: '2', viewValue: 'Pedagogy'},
    {value: '3', viewValue: 'Buisness'},
    {value: '4', viewValue: 'Economy'}
  ];

  locations: Object[] = [
    {value: '1', viewValue: 'Eindhoven'},
    {value: '2', viewValue: 'Venlo'},
    {value: '3', viewValue: 'Tilburg'}
  ];

  StudentDisabled: boolean;
  EmployeeDisabled: boolean;

  constructor(private filterService: FilterService,
              private route: ActivatedRoute) { 
                this.StudentDisabled = false;
                this.EmployeeDisabled = false;
              }


  ngOnInit(): void { 
    
  }

  searchText = '';
  TypeSelection: String;
  syearSelection: String;
  wyearSelection: String;
  departmentSelection: String;
  locationSelection: String;
  users: UserDTO[]; 
  user: UserDTO;
  

  combinedFilter(){

    console.log(this.searchText);

    if(this.TypeSelection != null && this.syearSelection != null && this.locationSelection != null && this.departmentSelection != null){
      console.log("Student Year");
      this.filterService.filterUsersByTypeLocationDepartmentStudyYear(this.TypeSelection, this.syearSelection, this.locationSelection, this.departmentSelection).subscribe((data)=>
      {
        this.users = <UserDTO[]>data;
        console.log(this.users);
      });
    }

    else if(this.TypeSelection != null && this.wyearSelection != null && this.locationSelection != null && this.departmentSelection != null){
         console.log("Employee Year");
        this.filterService.filterUsersByTypeLocationDepartmentWorkYearFontysStaff(this.TypeSelection, this.wyearSelection, this.locationSelection, this.departmentSelection).subscribe((data)=>
        {
          this.users = <UserDTO[]>data;
          console.log(this.users);
        });
    }

    
    else if(this.searchText != null && this.TypeSelection != null && this.locationSelection != null && this.departmentSelection != null){
      console.log("using search box in combining the search");
      this.filterService.filterUsersByTypeLocationDepartmentName(this.searchText, this.locationSelection, this.departmentSelection, this.TypeSelection).subscribe((data)=>
      {
        this.users = <UserDTO[]>data;
        console.log(this.users);
      });
    }

    else if(this.TypeSelection != null && this.locationSelection != null && this.departmentSelection != null){
      console.log("Users wothout year");
      this.filterService.filterUsersByTypeLocationDepartment(this.TypeSelection, this.locationSelection, this.departmentSelection).subscribe((data)=>
      {
        this.users = <UserDTO[]>data;
        console.log(this.users);
      });
    } 

  }

  getUsersByFirstNameChars(){

    if (this.searchText != null){
      this.filterService.filterUsersByName(this.searchText).subscribe((data)=>
      {
       this.users=<UserDTO[]>data;
        console.log(this.users);     
      });
    }

  }
  
  getUsersByType(){

    if (this.TypeSelection == "Student"){

      this.filterService.filterByUserType(this.TypeSelection).subscribe((data)=>
      {
        this.users=<UserDTO[]>data;
        this.StudentDisabled = true;
        this.EmployeeDisabled = false;
        console.log(this.users);      
      });

    }

    else{
      this.filterService.filterByUserType(this.TypeSelection).subscribe((data)=>
      {
        this.users=<UserDTO[]>data;
        this.StudentDisabled = false;
        this.EmployeeDisabled = true;
        console.log(this.users);      
      });
    }
    
  }


  getUsersByStudyYear(){
    this.filterService.filterUsersByStartStudyYear(this.syearSelection).subscribe((data)=>
    {
     this.users=<UserDTO[]>data;
      console.log(this.users);     
    });
  }

  getUsersByWorkYear(){
    this.filterService.filterUsersByStartWorkYear(this.wyearSelection).subscribe((data)=>
    {
     this.users=<UserDTO[]>data;
      console.log(this.users);  
    });
  }

  getUsersByLocation(){
    this.filterService.filterUserByLocation(this.locationSelection).subscribe((data)=>
    {
      this.users=<UserDTO[]>data; 
      console.log(this.users);      
    });
  }

  getUsersByDepartment(){
    this.filterService.filterUserByDepartment(this.departmentSelection).subscribe((data)=>
    {
      this.users=<UserDTO[]>data; 
      console.log(this.users);      
    });
  }

  ClearFilters(){
    window.location.reload();
  }

  foundDataByUserType(){
    return this.TypeSelection;
  }

  foundDataByYear(){
    return this.syearSelection;
  }

  foundDataByDepartment(){
    return this.departmentSelection;
  }

  foundDataByLocation(){
    return this.locationSelection;
  }

  foundDataByStartWorkYear(){
    return this.wyearSelection;
  }

  foundDataByInput(){
    return this.searchText;
  }

  @ViewChild('scrollable') private scrollable: ElementRef;
    disableScrollDown = false;

  // Scroll
  onScroll() {
    let element = this.scrollable.nativeElement;
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
        this.disableScrollDown = false;
    } else {
        this.disableScrollDown = true; 
    }
}

}
