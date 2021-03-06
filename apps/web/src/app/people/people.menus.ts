import {PageMenu} from "@web-libs/components/layout/page-menu.component";

export const PeoplePageMenus:PageMenu[] = [
  {
    title: 'Overview',
    link: '/people',
    options: { exact: true }
  },
  {
    title: 'Add Person',
    link: '/people/new'
  },
  {
    title: 'Classifications',
    link: '/people/classifications'
  }
]
