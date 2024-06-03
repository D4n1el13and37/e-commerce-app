import { Link, useLocation } from 'react-router-dom';
import cl from './BreadCrumbs.module.scss';

function Breadcrumbs() {
  const location = useLocation().pathname;
  let currentLink = '';

  const crumbs = location
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <div className={cl.crumb} key={crumb}>
          <Link to={currentLink}>{crumb.split('%20').join(' ')}</Link>
        </div>
      );
    });

  return <div className={cl.breadcrumbs}>{crumbs}</div>;
}

export default Breadcrumbs;
