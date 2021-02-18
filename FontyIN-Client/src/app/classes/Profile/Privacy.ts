  
export class privacy{
    constructor(
        public id: number,
        public userId: number,
        public educationSetting: string,
        public experienceSetting: string,
        public skillSetting: string,
        public hideFromSearch:boolean,
    ) {  }
}