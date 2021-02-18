import { Skill } from './Skill';
import { Education } from './Education';
import { Experience } from './Experience';
import { About } from './About';
import { Profile } from './Profile';

export class Data{
    constructor( 
        public  experiences: Array<Experience>,
        public  educations: Array<Education>,

        public  skills: Array<Skill>,

        public  abouts: Array<About>,
        public  profiles: Array<Profile>,

       
      ) {  }
}