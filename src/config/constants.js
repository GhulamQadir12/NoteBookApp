import {
  BikeSVG,
  CarSVG,
  FurnitureSVG,
  HomeremovalsSVG,
  OfficeremovalsSVG,
  ParcelSVG,
  PianoSVG,
  SpecialistSVG,
  VehilcepartsSVG,
} from 'assets/icons';
import * as IMG from 'assets/images';
import moment from 'moment';
export const DATE_FORMAT = {
  yyyy_mm_dd: 'YYYY-MM-DD',
};
export const COLLECTIONS = {
  users: 'users',
  tasks: 'tasks',
};
export const STORAGEKEYS = {
  userId: '@userId',
  user: '@user',
  token: '@token',
  lang: '@language',
};
export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Satureday',
  'Sunday',
];

export const HomeList = [
  {
    image: IMG.fingerprintimg,
    title: 'Attendance',
    moveTo: 'Attendance',
  },
  {
    image: IMG.leaveimg,
    title: 'Leave Request',
    moveTo: 'LeaveRequestList',
  },
  {
    image: IMG.taskmangerimg,
    title: 'To-dos',
    moveTo: 'TodoList',
  },
  {
    // image: IMG.payrollimg,
    image: IMG.companycalendarimg,
    title: 'Company Calender',
    moveTo: 'CompanyCalender',

  },
  // {
  //   // image: IMG.notificationimg,
  //   image: IMG.announcementimg,
  //   title: 'Announcements',
  // },
];
export const ONBOARDING_LIST = [
  {
    image: IMG.rocket,
    title: 'quick_search',
    desc: 'Pick Up Your Order',
  },
  {
    image: IMG.vehicle,
    title: 'fast_shipping',
    desc: 'Pick Up Your Order',
  },
  {
    image: IMG.mobile,
    title: 'free_rides',
    desc: 'Pick Up Your Order',
  },
];
export const SERVICE_LIST = [
  {
    icon: FurnitureSVG,
    title: 'Furniture & Other Items',
    desc: 'Table,Sofa,fridges',
    screenName: 'WhereToMoveScreen',
  },
  {
    icon: HomeremovalsSVG,
    title: 'Home Removals',
    desc: 'All Home removal items',
    screenName: 'FurnitureItemsScreen',
  },

  {
    icon: CarSVG,
    title: 'Cars & Vehicles',
    desc: 'Ford Focus, Toyota,Corolla',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: BikeSVG,
    title: 'Mototbikes',
    desc: 'Cruiser,Sportsstar',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: PianoSVG,
    title: 'Pianos',
    desc: 'Upright, Grands,Kryboard',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: ParcelSVG,
    title: 'Parcel & Packages',
    desc: 'off all size and shape',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: SpecialistSVG,
    title: 'Specialits & Antiques',
    desc: 'Glass cabintes & Ornamnets',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: VehilcepartsSVG,
    title: 'Vehilce Parts',
    desc: 'Engines,Tyres,Car Cover',
    screenName: 'FurnitureItemsScreen',
  },
  {
    icon: OfficeremovalsSVG,
    title: 'Office Removals',
    desc: 'Desks ,Computers,Chairs',
    screenName: 'FurnitureItemsScreen',
  },
];

export const FORM_DATA = [
  {
    type: 'select',
    required: true,
    label: 'Please Select Pickup Floor',
    placeholder: 'Please Select Pickup Floor',
    className: 'form-control',
    name: 'select-1691432809321-0',
    multiple: true,
    column: '1',
    is_enable_chart: false,
    chart_type: 'bar',
    values: [
      {label: 'Ground Floor', value: 'Ground Floor', selected: false},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
      {label: 'Ground Floor', value: 'Ground Floor', selected: false},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
      {label: 'Ground Floor', value: 'Ground Floor', selected: false},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
      {label: 'Ground Floor', value: 'Ground Floor', selected: false},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
    ],
  },
  {
    type: 'select',
    required: true,
    label: 'Please Select gender',
    placeholder: 'Please Select Dropoff Floor',
    className: 'form-control',
    name: 'select-1691432923817',
    multiple: false,
    column: '1',
    is_enable_chart: false,
    chart_type: 'bar',
    values: [
      {label: 'male', value: 'male', selected: true},
      {label: 'female', value: 'female', selected: false},
    ],
  },
  {
    type: 'select',
    required: true,
    label: 'Please Select Dropoff Floor',
    placeholder: 'Please Select Dropoff Floor',
    className: 'form-control getNumber',
    name: 'select-1691433084311',
    multiple: false,
    column: '2',
    is_enable_chart: true,
    chart_type: 'bar',
    values: [
      {label: 'Ground Floor', value: 'Ground Floor', selected: false},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
    ],
  },
  {
    type: 'select',
    required: true,
    label: 'Please Select Dropoff Floor',
    placeholder: 'Please Select Dropoff Floor',
    className: 'form-control getNumber',
    name: 'select-1691433098194',
    multiple: false,
    column: '2',
    is_enable_chart: false,
    chart_type: 'bar',
    values: [
      {label: 'Ground Floor', value: 'Ground Floor', selected: true},
      {label: '1st Floor', value: '1st Floor', selected: false},
      {label: '2nd Floor', value: '2nd Floor', selected: false},
    ],
  },
  {
    type: 'textarea',
    required: false,
    label: 'Any other item please input details:',
    className: 'form-control',
    name: 'textarea-1691433058421-0',
    subtype: 'textarea',
    column: '1',
  },
];
export const MANAGE_CAR_LIST = [
  {
    icon: IMG.truckvehicle,
    title: 'Semi Figures',
    desc: 'Loading Boxes',
  },
  {
    icon: IMG.hondablackvehicle,
    title: 'Honda NSX',
    desc: 'The New Hybrid Super Car',
  },

  {
    icon: IMG.hondavechile,
    title: 'Honda NSX',
    desc: 'The New Hybrid Super Car',
  },
];
export const ORDER_DETAILS_LIST = {
  Order_no: '123',
  date: moment().format(DATE_FORMAT.yyyy_mm_dd),
  name: 'Ali Abdullah',
  delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
  pickup_location: 'Pickup Location',
  service_type: 'Service Type',
};

export const ORDER_LIST = [
  {
    Order_no: '123',
    date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location:
      'Pickup Location paddingVertical: mvs(8)paddingVertical: mvs(8)',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
];
export const RECENT_ORDER_LIST = [
  {
    Order_no: '123',
    status: 'Delieverd',
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location:
      'Pickup Location paddingVertical: mvs(8)paddingVertical: mvs(8)',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    status: 'Delieverd',
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    status: 'Delieverd',
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
  {
    Order_no: '123',
    status: 'Delieverd',
    name: 'Ali Abdullah',
    delivery_time: moment().format(DATE_FORMAT.yyyy_mm_dd),
    pickup_location: 'Pickup Location',
    service_type: 'SERVICE TYPE',
  },
];
export const ITEM_DETAILS_LIST = [
  {
    item_name: 'SMART TV (Less than 30 inch, SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
  {
    item_name: 'SMART TV (Less than 30 inch',
    quantity: '1',
  },
];
export const ABOUT_US_LIST = [
  {
    image: 'https://getmovers.co.uk/static/media/get.0a606868.png',
    title: 'Who are we?',
    desc: 'GetMovers is an accomplished removal and storage agency with hundreds of satisfied customers online. It was established by a group of experienced professionals with over 20 years of experience in the said industry. We have multiple storage units throughout the United Kingdom, and our partnerships with local clients make getting more affordable rates for your move easy. GetMovers caters to both residential and commercial customers alike. We do everything the standard removal and storage service does, just better and at more affordable rates!',
  },
  {
    image: 'https://getmovers.co.uk/static/media/service.903780cb.png',

    title: 'Our Story',
    desc: 'Here at GetMovers, we realise that the removal and storage industry is in dire need of change. Most, if not, all of the time, the prices for even a small move can be OUTRAGEOUS, and we get that.One eventful evening, our founding team at GetMovers, finally decided to become the change instead of waiting for it, and the result? Hundreds of satisfied customers online! GetMovers takes immense pride in providing the absolute best removal services at the most affordable rates without compromising on any front. Be it customer service, security of goods or the overall planning of the move, we strive to deliver the best you can think of!',
  },

  {
    image: 'https://getmovers.co.uk/static/media/price.b839cb60.png',

    title: 'How much can a removal with GetMovers cost?',
    desc: 'Every move is made up of unique factors in its simple way. Each of these factors, such as the pickup floor, the number of items or the nature of the items, can affect the total cost of the move. For more accurate pricing information specific to your relocation, we’d recommend getting a few quotes or contacting us directly at (0800 6358888).',
  },
];
export const BLOGS_LIST = [
  {
    image: 'https://getmovers.co.uk/static/media/who.94e82f50.png',
    title: 'Partner up with GetMovers!',
    desc: 'Becoming a working member of the GetMovers family allows you to work at your convenience. You can set your availability hours and take on jobs whenever you deem fit With GetMovers moving just around anything you can find, from vehicles to household items, there is never a shortage of jobs. We provide our local partners with the flexibility of taking on whatever position they deem fit. Think you’re up for it? Get started now and add another income stream to your monthly revenue.',
  },
  {
    image: 'https://getmovers.co.uk/static/media/why.aafaca11.png',

    title: 'Why work for us?',
    desc: 'At GetMovers, we’re not just concerned with customer satisfaction, but we also make sure to ensure the comfort of our own. Becoming a part of the GetMovers family isn’t just in the name; we mean it.',
  },
];
export const ADVICE_FROM_US_LIST = [
  {
    image: 'https://getmovers.co.uk/static/media/pro.ed5428c2.png',
    title: 'Why hire professional movers?',
    desc: 'Like, couldn’t you just do it yourself? While you technically could, there’s a lot that comes with a move. From proper planning to making sure everything is adequately taken care of. Here are a few reasons why you may prefer hiring professional movers instead of just doing it yourself:',
  },
  {
    image: 'https://getmovers.co.uk/static/media/tipp.34cdbce7.png',

    title: 'How much should you tip your movers?',
    desc: 'The standard tipping rate for professional movers is between £3 and £6 per hour for each mover. On average, people set aside around 20% of their total budget to tip their movers. Tipping doesn’t usually cost more than 20% of the total cost of the move unless, of course, you’re an extremely generous tipper.Point to note: You should always tip everyone the same amount of money per hour, be it the movers or the lead workers. Unequal tipping can lead to dissatisfaction amongst the crew members. With GetMovers, making more money in tips should depend more on the number of hours worked and not the position worked.',
  },
  {
    image: 'https://getmovers.co.uk/static/media/difi.4bfee1e7.jpg',
    title: 'What are the four most difficult objects to move?',
    desc: 'Moving is pretty complicated; however, these four items can make your moving experience even worse!',
  },
  {
    image: 'https://getmovers.co.uk/static/media/b3.b1647e55.jpg',

    title: 'Cars',
    desc: 'Cars can either be the easiest or the hardest object to move; there’s just no in-between. For a functioning vehicle with at least one driver and a nearby location, the move will take place without any significant hiccups.But for single or multiple inoperable vehicles with a distant location, you get a headache beyond your capacity. For people who don’t know how to operate a tow truck, calling in a professional moving agency or a dedicated automobile transport service is the best decision at hand.',
  },
  {
    image: 'https://getmovers.co.uk/static/media/b5.27373e64.jpg',
    title: 'Pianos',
    desc: 'Pianos are infamous for being a frustrating mix of heavy and fragile.They aren’t just large; they’re cumbersome and fragile too. Pianos weigh around 340 kilograms (750 pounds), which quickly puts them out of the lifting range of most families. Combine that with the fact that pianos have a super delicate balance of hammers, strings, and interconnected keys, which can get all messed up or broken easily, and you got yourself the ultimate nightmare of moving a pianoProfessionals, who are used to dealing with pianos, aren’t just strong people, they’re also highly familiar with the musical instrument and its know-how.',
  },
  {
    image: 'https://getmovers.co.uk/static/media/art.dd553f9b.png',

    title: 'Pottery and Art',
    desc: 'The difficulty of moving pottery or art goes without saying. The average pottery piece can break or crack at a slight drop or mishandling. On the other hand, art forms, such as paintings, might not seem as breakable, but they are much more prone to damage from other factors such as heat, light or smudging.Furthermore, dealing with such pieces often means handling an object that is simply not replaceable, for instance, a family heirloom. Hence, pottery or art of any kind must be handled very carefully on every step of the moving journey from the initial wrap to the final unloading.',
  },
  {
    image: 'https://getmovers.co.uk/static/media/book.efabcada.png',

    title: 'Firearms',
    desc: 'Moving firearms presents not only safety but also legal concerns during a move. When moving, guns should be packed into safety cases that are appropriately labelled. Furthermore, all movers (or participants if it’s a DIY move) should be informed beforehand about the presence of the firearms to be relocated.The removal and storage of firearms can also be deemed illegal under certain circumstances. When planning a move, be sure to educate yourself on the gun safety and relocation laws of the intended location before making a move.',
  },
];
