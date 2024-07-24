import { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import Modal from "../../Components/Modal";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const TodoPage = () => {
  const [todoData, setTodoData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>();

  const openModal = () => setIsModalOpen(true);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: editData?.title ?? "",
      description: editData?.description ?? "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("title is required"),
      description: Yup.string().required("description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (editData?.title) {
          const response = await axiosInstance.put(
            "/update_task/6699f9f3e146ae1ae4893c07",
            {
              data: values,
            }
          );
          if (response.status === 200) {
            toast.success("Updated Successfull");
            closeModal();
          }
        } else {
          const response = await axiosInstance.post("/add_task", {
            data: values,
          });
          if (response.status === 200) {
            toast.success("Added Successfull");
            closeModal();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    setEditData(null);
  };

  const deleteTodo = async () => {
    try {
      const response = await axiosInstance.delete(
        "/delete_task/6699f9f3e146ae1ae4893c07"
      );
      if (response.status === 200) {
        toast.success("Deleted Successfull");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axiosInstance.get("/all_task");
        console.log(" res : ", response);
        setTodoData(response.data?.findall);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    setFieldValue("title", editData?.title);
    setFieldValue("description", editData?.description);
  }, [editData]);

  return (
    <div className="w-full min-h-screen overflow-auto flex justify-center items-center p-3">
      <div className="w-full max-w-md mx-auto">
        <div className="w-full">
          <button
            className="px-4 py-2 text-white w-full bg-orange-400 rounded-lg"
            onClick={openModal}
          >
            Open Todo
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Todo">
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <div className="mb-2 text-sm">Enter title</div>
                <input
                  type="text"
                  name="title"
                  placeholder="Username or title address"
                  className="py-2 px-3 w-full outline-none border-2 rounded-lg border-gray-400 placeholder:text-xs"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <div className="h-4 text-xs text-red-500">
                  {touched.title ? errors.title : ""}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm">Enter Description</div>
                <input
                  type="description"
                  name="description"
                  placeholder="Password"
                  className="py-2 px-3 w-full outline-none border-2 rounded-lg border-gray-400 placeholder:text-xs"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <div className="h-4 text-xs text-red-500">
                  {touched.description ? errors.description : ""}
                </div>
              </div>
              <button
                type="submit"
                className="text-sm my-6 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer max-[426px]:mb-0"
              >
                Add
              </button>
            </form>
          </Modal>
        </div>
        <div className="w-full mt-3">
          {todoData.map((todo: any, ind: number) => {
            return (
              <div
                className="border-b flex items-center justify-between p-3 bg-gray-400 rounded-lg mb-3"
                key={ind}
              >
                <div className="w-full">
                  <h3 className="font-bold">{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                  className="hover:bg-gray-700 hover:text-white p-2 rounded-lg "
                    onClick={() => {
                      setEditData(todo);
                      openModal();
                    }}
                  >
                    Edit
                  </button>
                  <button
                  className="hover:bg-gray-700 hover:text-white p-2 rounded-lg "
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
