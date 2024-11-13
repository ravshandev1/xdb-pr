import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import cls from "./navbar.module.css";
import Button from "@/components/button/button";
import { LuPlus } from "react-icons/lu";
import { IoDownload, IoReload } from "react-icons/io5";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { CreateUserModal } from "../users/modal/CreateUserModal";
import { useGetUsers } from "@/hook/useGetUsers";
import { ConfirmModal } from "../users/modal/ConfirmModal";
import { useGetApplications } from "@/hook/useApplication";
import MonthPicker from "@/components/datepicker/MonthPicker";
import { useDate } from "@/contexts/DateContext";
import { toast } from "react-toastify";
import { useSearch } from "@/contexts/SearchContext";

const Navbar = () => {
  const [file, setFile] = useState<File | null>(null);
  const { setDate, date } = useDate();
  const pathname = usePathname();
  const { refetch, isRefetching } = useGetUsers();
  const {
    uploadFile,
    refetch: refetchApplications,
    isRefetching: isRefetchingApplications,
  } = useGetApplications();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isDashboard = pathname === "/dashboard";
  const isSettingsPage = pathname.includes("/dashboard/settings");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { searchValue, setSearchValue } = useSearch();

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const breadcrumbItems = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, arr) => {
      const href = `/${arr.slice(0, index + 1).join("/")}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: href,
      };
    });

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      setFile(newFile);

      onConfirmOpen();
    } else {
      toast.error("File not selected");
    }
  };
  const handleConfirmUpload = () => {
    if (file) {
      uploadFile.mutate(file);
      onConfirmClose();
    }
  };

  console.log(date?.getMonth(), "here");

  return (
    <header className={cls.container}>
      <div className={cls.links}>
        <h1 className={cls.title}>Qazilma</h1>
        {!isDashboard && <Breadcrumb items={breadcrumbItems} />}
      </div>
      {!isSettingsPage && (
        <div className={cls.actions}>
          <input
            className="p-2 border rounded-lg"
            type="number"
            placeholder="STIR"
            value={searchValue}
            onChange={(e) => setSearchValue(parseInt(e.target.value))}
          />
          {isDashboard && (
            <MonthPicker
              onChange={(month, year) =>
                month !== null && year !== null
                  ? setDate(new Date(year, month))
                  : setDate(null)
              }
            />
          )}
          {date ? (
            <a
              href={`${
                process.env.NEXT_PUBLIC_API_URL
              }/applications/${date.getFullYear()}/${date.getMonth() + 1}`}
              className={cls.downloadButton}
              download
              title="Download"
            >
              <IoDownload />
            </a>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              refetch();
              refetchApplications();
            }}
            className={cls.refreshButton}
          >
            <IoReload
              className={
                isRefetching || isRefetchingApplications ? "animate-spin" : ""
              }
            />
          </button>
          {isDashboard ? (
            <Button onClick={handleUploadFile} Icon={<LuPlus />}>
              Excelni yuklash
            </Button>
          ) : (
            <Button onClick={onOpen} Icon={<LuPlus />}>
              Create user
            </Button>
          )}

          <input
            type="file"
            accept=".xls,.xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <CreateUserModal isOpen={isOpen} onClose={onClose} />
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={onConfirmClose}
            text={`Are you sure you want to upload ${file?.name}?`}
            onClick={handleConfirmUpload}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
