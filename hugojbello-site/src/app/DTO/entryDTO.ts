export class EntryDTO {
  _id:string;
  id:string;
  name: string;
  title: string;
  updated_at: Date;
  created_at: Date;
  author: string;
  content: string;
  categories:string[];
  edited_by:string; 
  hidden:boolean; 
  new:string;
}
