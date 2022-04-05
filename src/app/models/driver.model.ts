export interface Driver {
  name: string;
  phone: string;
  email: string;
  location: Location;
  tasks: [task: Task];
}
