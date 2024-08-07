import React,{ useState } from "react";


function AddUserModal({ showDialog,setShowDialog,handleAddUser }) {

  const tempformData={
    useremail:"",
  }

  const [formData, setFormData] = useState(tempformData);

  const handleDialogShow = () => {
    // console.log(formData)
    setShowDialog(!showDialog);

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.useremail) return;
    handleAddUser(formData.useremail);

  };


  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-opacity-50 bg-slate-400 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg border border-black bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-base font-semibold leading-6 text-black"
                    id="modal-title"
                  >
                    Enter User Email
                  </h3>
                  
                  <div className="mt-2 w-full border border-black rounded-lg overflow-hidden caret-white focus:ring-2 ">
                    <input
                      className="w-full text-black  px-3 py-2 text-sm outline-none"
                      type="email"
                      name="useremail"
                      placeholder="Enter email id"
                      onChange={handleChange}
                    ></input>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="bg-background  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center bg-gray-700 hover:bg-gray-800 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
              >
                Add User
              </button>
              <button
                type="button"
                onClick={handleDialogShow}
                className="mt-3 inline-flex w-full justify-center bg-gray-700 hover:bg-gray-800 rounded-md text-white bg-secondary px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-foreground hover:text-background sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
