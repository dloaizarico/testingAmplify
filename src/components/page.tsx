import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Ref } from 'src/types';

const Page = forwardRef<Ref, { children: React.ReactNode, title: string, className: string }>(({ children, title = '', ...rest }, ref) => {

  return (
    <div ref={ref} {...rest} >
      <Helmet>
        <title>{`Ordering - ${title}`}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
