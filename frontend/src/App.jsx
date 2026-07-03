import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
   import AdminResults from './pages/AdminResults';
   import MyResults from './pages/MyResults';

   function Home() {
     return (
       <div>
         <h1>Student Results Management</h1>
         <p><Link to="/admin/results">Go to Admin Results</Link></p>
         <p><Link to="/my-results">Go to My Results</Link></p>
       </div>
     );
   }

   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/admin/results" element={<AdminResults />} />
           <Route path="/my-results" element={<MyResults />} />
         </Routes>
       </BrowserRouter>
     );
   }

   export default App;
