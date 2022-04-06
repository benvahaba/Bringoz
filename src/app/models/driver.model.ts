import { Location } from './Location.model';
import { Task } from './Task.model';

export interface Driver {
  id: string;
  imgUrl: string;
  name: string;
  phone: string;
  email: string;
  location: Location;
  tasks: [task: Task];
}
