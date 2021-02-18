

enum EmplymentType {
    FullTime,
    PartTime,
    FreeLancer
}

export class Experience{
    constructor( 
        public id: number,
        public  profileId: number,
        public  title: string,
        public  company:string,
        public  employmentType : string,
        public  location: string,
        public  startDateExperience: number,
        public  endDateExperience: number,
        public  descriptionExperience: string,
      ) {  }
}