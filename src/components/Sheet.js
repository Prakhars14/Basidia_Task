import React, { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const Sheet = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

  useEffect(() => {
    
    sheetfunc();
  }, [])

    const sheetfunc=async()=>{
      const SHEET_ID = process.env.REACT_APP_SHEET_ID;
      const doc = new GoogleSpreadsheet(SHEET_ID);
      await doc.useServiceAccountAuth({
          private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
          client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      });

      await doc.loadInfo()
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows(); 
      console.log(rows);
    }
    const submitEvent = async () => {
        sheetfunc();
        // await sheet.addRow({ Name: name, Email: email, Text: text });
        setName('')
        setEmail('')
        setText('')
    }
    return (
        <>
                <div>
        <div>
            <label>Name: </label>
            <input type='text' 
                    value={name} 
                    onChange={e => setName(e.target.value)}>
            </input>
            <label>Email: </label>
            <input type='email' 
                   value={email} 
                   onChange={e => setEmail(e.target.value)}>
            </input>
        </div>
        <div>
            <textarea 
                  value={text} 
                  onChange={e => setText(e.target.value)}>
            </textarea>
        </div>
            <p><button onClick={submitEvent}>Complete</button></p>
    </div>
        </>
    )
}

export default Sheet
