# Mnemeric

Mnemeric is a data encoding algorithm for turning lengthy, unintelligible codes like device serial numbers and passcodes into natural language phrases that you can remember and communicate easily. This prototype was developed in 39hrs for the SYNCSHACK 2021 hackathon. It is the winner of the SYNCSHACK Best Algorithm Prize.

See a [working prototype here](https://mnemeric.vercel.app/).

Watch a [video demo here](https://youtu.be/Sd_gbSc3MDE).

## Background
This project is the product of our accumulated frustration having to remember lengthy and confusing credit card details, passwords though, student ids, phone numbers, and to communicate gift card codes and device serial numbers to technical support over the phone. Humans naturally aren't great at remembering unintelligible sequences of unrelated symbols well - they aren’t just as meaningful as words.

Reducing this information overload without sacrificing our privacy will declutter our heads and enable all individuals who participate in modern life to focus on what really matters.

## What is Mnemeric
Mnemeric is a cipher that translates between binary data and natural language. Users can supply complex sequences of ASCII characters on our website and encode them into simple, memorable words. They are able to customise the settings to cater for various code types (numeric, alphanumeric, UPC, ISBN etc.) Inversely, natural language phrases can also be decoded back into ASCII code.

## The Filtered Dictionary of Words for Encoding

We calculated the frequencies of all the words in the OANC (Open American National Corpus), applied some length filtering and character filtering (lowercase, remove hyphen etc.), then after filtering profanity using a profanity list from Carnegie Mellon University, we took the top 8196 most frequent words. This allows us to encode 13 bits into a single dictionary word.
2^13 = 8196


## Encoding Scheme and Control Word

Since encoding directly between ASCII and dictionary words will only provide a word to character ratio of **13/8**, which is quite poor, and the fact that many types of data in the real world have a limited alphabet of characters, we decided to implement an encoding scheme to optimise the encoding of different types of data. 
 Our scheme uses a **13 bit control word **at the start of the code phrase to store data about the encoding scheme (5 bits), a message length offset (4 bits) which is necessary for accurate decoding, room for a small checksum (2 bits) for validation, and a encoding number (2 bits) which allows the user to select between four possible encodings. The encoding number serves to allow users to avoid rare code phrases which contain several duplicate words, or specific words.


<table>
  <tr>
   <td>
<strong>0</strong>
   </td>
   <td><strong>1</strong>
   </td>
   <td><strong>2</strong>
   </td>
   <td><strong>3</strong>
   </td>
   <td><strong>4</strong>
   </td>
   <td><strong>5</strong>
   </td>
   <td><strong>6</strong>
   </td>
   <td><strong>7</strong>
   </td>
   <td><strong>8</strong>
   </td>
   <td><strong>9</strong>
   </td>
   <td><strong>10</strong>
   </td>
   <td><strong>11</strong>
   </td>
   <td><strong>12</strong>
   </td>
  </tr>
  <tr>
   <td colspan="5" ><strong>Encoding Scheme</strong>
   </td>
   <td colspan="4" ><strong>End of Message Offset</strong>
   </td>
   <td colspan="2" ><strong>Checksum</strong>
   </td>
   <td colspan="2" ><strong>Hash</strong>
   </td>
  </tr>
</table>



 Please note that the **checksum and hash components are not implemented** in the demo.
 The **Encoding Scheme** is a set of five boolean values that determine whether a common set of characters is present in the encoded data, this makes the encoding of data that has a limited character set (such as numeric only) much more efficient.
 

<table>
  <tr>
   <td>
<strong>0</strong>
   </td>
   <td><strong>1</strong>
   </td>
   <td><strong>2</strong>
   </td>
   <td><strong>3</strong>
   </td>
   <td><strong>4</strong>
   </td>
  </tr>
  <tr>
   <td colspan="5" ><strong>Encoding Scheme</strong> huffman encoding
   </td>
  </tr>
  <tr>
   <td><strong>Separators</strong>
   </td>
   <td><strong>Special</strong>
   </td>
   <td><strong>Capital</strong>
   </td>
   <td><strong>Lowercase</strong>
   </td>
   <td><strong>Numeric</strong>
   </td>
  </tr>
</table>



Note that the **Separators** character set is a subset of the **Special** character set, so these values are mutually exclusive. If both of these values are set to true, we consider the following three bits to represent an extended encoding type.

## The Web Application

We used [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The front end was built with React.js and various component libraries such as Material UI. The app is run completely clientside (see sourcecode) so you can be sure than none of your input into the website is exposed elsewhere on the web.
