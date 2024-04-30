import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/new-york/ui/pagination"

interface DataTablePaginationProps {
  previous: () => void
  next: () => void
  page: number
  nbPages: number
  setPage: (page: number) => () => void
}

export function DataTablePagination({previous, next, page, nbPages, setPage}: DataTablePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        { page > 0 &&
        <>
        <PaginationItem>
          <PaginationPrevious onClick={previous} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={setPage(page - 1)}>{page - 1}</PaginationLink>
        </PaginationItem>
        </>
        }
        <PaginationItem>
          <PaginationLink isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        { page < nbPages &&
        <>
        <PaginationItem>
          <PaginationLink onClick={setPage(page + 1)}>{page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={next}/>
        </PaginationItem>
        </>
        }
      </PaginationContent>
    </Pagination>
  )
}
