import Image from "next/image";
import { IApplicationData, IStatus } from "@/types";
import cls from "./table.module.css";
import Badge from "./badge/badge";
import { Skeleton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { useGetApplications } from "@/hook/useApplication";

interface TableProps {
  data: IApplicationData[] | undefined;
  isLoading: boolean;
}

const SkeletonRow: FC = () => (
  <tr className={cls.row}>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
    <td className={cls.col}>
      <Skeleton height={5} />
    </td>
  </tr>
);

const Table = ({ data, isLoading }: TableProps) => {
  const {
    sendAppliction,
    isLoading: sendLoading,
    refetch,
  } = useGetApplications();

  const handleSend = (item: IApplicationData) => {
    sendAppliction.mutate(Number(item.id), {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <table className={cls.table}>
      <thead className={cls.tableHead}>
        <tr className={cls.tableHeadRow}>
          <th className={cls.tableHeadTitle}>Kod</th>
          <th className={cls.tableHeadTitle}>Tashkilot nomi</th>
          <th className={cls.tableHeadTitle}>STIR</th>
          <th className={cls.tableHeadTitle}>Manzil</th>
          <th className={cls.tableHeadTitle}>Sana</th>
          <th className={cls.tableHeadTitle}>Qazilma miqdori</th>
          <th className={cls.tableHeadTitle}>Kutilma</th>
          <th className={cls.tableHeadTitle}>Farq</th>
          <th className={cls.tableHeadTitle}>Holat</th>
        </tr>
      </thead>

      <tbody className={cls.tableBody}>
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <>
            {data?.length === 0 ? (
              <tr className={cls.empty}>
                <td colSpan={7}>
                  <Image
                    className={cls.emptyImage}
                    src="/images/illustration_empty_content.svg"
                    alt=""
                    width={300}
                    height={300}
                  />
                  <p className={cls.emptyText}>Ma&apos;lumotlar topilmadi</p>
                </td>
              </tr>
            ) : (
              data?.map((item) => (
                <tr className={cls.row} key={item.id}>
                  <td className={cls.col}>
                    <Tooltip label={String(item.id)}>{String(item.id)}</Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Tooltip label={item.subject_name}>
                      {item.subject_name}
                    </Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Tooltip label={item.stir}>{String(item.stir)}</Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Tooltip label={item.address}>{item.address}</Tooltip>
                  </td>
                  <td className={cls.col}>{item.date}</td>
                  <td className={cls.col}>
                    <Tooltip label={String(item.count)}>
                      {String(item.count)}
                    </Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Tooltip label={String(item.diff_count)}>
                      {String(item.diff_count)}
                    </Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Tooltip label={String(item.different)}>
                      {String(item.different)}
                    </Tooltip>
                  </td>
                  <td className={cls.col}>
                    <Badge
                      status={item.status}
                      errorMessage={
                        item.status === IStatus.Xatolik
                          ? "Bu yerda xatolik bor. Iltimos xatolikni bartaraf etib qaytdan urinib ko'ring."
                          : ""
                      }
                    />
                    {item.status === IStatus.Takrorlangan && (
                      <button
                        disabled={sendLoading}
                        onClick={() => handleSend(item)}
                        className={cls.sendBtn}
                      >
                        Yuborish
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
