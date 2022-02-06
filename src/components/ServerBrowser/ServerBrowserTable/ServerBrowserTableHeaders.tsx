import React from 'react';

interface Props {}

function ServerBrowserTableHeaders(props: Props) {
  return (
    <tr className="grid grid-rows-1 grid-cols-2 gap-x-10 items-center border px-10 bg-gray-300">
      <th className="font-semibold text-center">Name</th>
      <th className="font-semibold text-center">Actions</th>
    </tr>
  );
}

export default ServerBrowserTableHeaders;
