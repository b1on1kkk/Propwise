import type { Events } from "@/interfaces/interfaces";

export function FilterEvents(
  filterQuery: string,
  data: Events[] | undefined,
  setEvents: (c: Events[]) => void
) {
  if (filterQuery.trim() !== "" && data) {
    // /?e_filt=imp&e_filt=impbnurg - split this string (example) to get values to filter
    const filter_params = filterQuery.split("&").map((str) => {
      return str.split("=")[1];
    });

    setEvents([
      ...data.filter((event) => {
        if (filter_params.includes(event.status)) return event;
      })
    ]);

    return;
  }
  if (data) setEvents(data);
}
