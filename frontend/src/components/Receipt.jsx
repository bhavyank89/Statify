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
        await navigator.share({
          files: [file],
          title: 'GitHub Receipt',
          text: 'Check out this GitHub Receipt!'
        });
      } else {
        alert('Sharing not supported. Image copied to clipboard.');
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      }
    });
  };

  return (
    <div ref={receiptRef} className="mt-10 max-w-md mx-auto text-left bg-white text-black p-4 shadow-xl font-mono">
      {/* Torn Top Edge */}
      <svg className="w-full" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
        <polygon points="0,0 100,0 95,20 90,0 85,20 80,0 75,20 70,0 65,20 60,0 55,20 50,0 45,20 40,0 35,20 30,0 25,20 20,0 15,20 10,0 5,20 0,0" fill="white" />
      </svg>

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

      <p className="text-center text-sm mt-2">Served by: Parth Shukla</p>
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

      {/* Torn Bottom Edge */}
      <svg className="w-full mt-4" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
        <polygon points="0,20 100,20 95,0 90,20 85,0 80,20 75,0 70,20 65,0 60,20 55,0 50,20 45,0 40,20 35,0 30,20 25,0 20,20 15,0 10,20 5,0 0,20" fill="white" />
      </svg>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={handleDownload} className="text-sm underline">⬇️ Download</button>
        <button onClick={handleShare} className="text-sm underline">🔗 Share</button>
      </div>

      <p className="text-sm text-neutral-400 mt-8">
        made by Parth | <a href="https://buymeacoffee.com/parthshukly" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">buy Parth a coffee</a>
      </p>
    </div>
  );
};

export default Receipt;