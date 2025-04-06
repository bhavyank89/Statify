import React, { useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';

const Receipt = ({ data }) => {
  const receiptRef = useRef(null);

  const handleDownload = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const link = document.createElement('a');
    link.download = `github-receipt-${data.login}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    const canvas = await html2canvas(receiptRef.current);
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `receipt-${data.login}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'GitHub Receipt', text: 'Check out this GitHub Receipt!' });
      } else {
        alert('Sharing not supported. The image has been copied to your clipboard.');
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      }
    });
  };

  return (
    <div className="mt-10 max-w-md mx-auto text-left bg-white text-black p-4 shadow-xl font-mono" ref={receiptRef}>
      <h2 className="text-center font-bold text-xl">GITHUB RECEIPT</h2>
      <p className="text-center text-sm">{data.date}</p>
      <p className="text-center text-xs mb-2">ORDER #{Math.floor(1000 + Math.random() * 9000)}</p>
      <p>CUSTOMER: {data.name}</p>
      <p className="text-gray-500">@{data.login}</p>

      <hr className="my-2" />

      <div className="grid grid-cols-2 gap-2">
        <p>REPOSITORIES</p><p className="text-right">{data.public_repos}</p>
        <p>STARS EARNED</p><p className="text-right">{data.stars}</p>
        <p>REPO FORKS</p><p className="text-right">{data.forks}</p>
        <p>FOLLOWERS</p><p className="text-right">{data.followers}</p>
        <p>FOLLOWING</p><p className="text-right">{data.following}</p>
      </div>

      <hr className="my-2" />

      <p><strong>TOP LANGUAGES:</strong><br />{data.top_languages.join(', ')}</p>
      <p><strong>MOST ACTIVE DAY:</strong> {data.most_active_day}</p>
      <p><strong>COMMITS (30d):</strong> {data.commit_count}</p>
      <p className="font-bold">CONTRIBUTION SCORE: <span className="float-right">{data.contribution_score}</span></p>

      <p className="text-center text-sm mt-2">Served by: Dennis Ritchie</p>
      <p className="text-center text-sm">{new Date().toLocaleTimeString()}</p>

      <hr className="my-2" />

      <p className="text-center">COUPON CODE: <strong>FQGNW1</strong></p>
      <p className="text-center text-sm">Save for your next commit!</p>

      <p className="text-xs mt-2">CARD #: **** **** **** 2025</p>
      <p className="text-xs">AUTH CODE: 623929</p>
      <p className="text-xs">CARDHOLDER: {data.login.toUpperCase()}</p>

      <p className="text-center font-bold mt-4">THANK YOU FOR CODING!</p>
      <div className="flex justify-center mt-4">
        <Barcode value={data.html_url} width={1.5} height={40} displayValue={false} />
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={handleDownload} className="text-sm underline">⬇️ Download</button>
        <button onClick={handleShare} className="text-sm underline">🔗 Share</button>
      </div>
    </div>
  );
};

export default Receipt;