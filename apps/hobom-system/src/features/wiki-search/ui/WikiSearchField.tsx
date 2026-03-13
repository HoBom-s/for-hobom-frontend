import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import type { SearchResultType } from "@/entities/wiki-page";
import { useWikiSearch } from "../model/useWikiSearch";

interface WikiSearchFieldProps {
  spaceKey: string;
}

export const WikiSearchField = ({ spaceKey }: WikiSearchFieldProps) => {
  const navigate = useNavigate();
  const { query, setQuery, results, searching } = useWikiSearch(spaceKey);

  const handleSelect = (
    _: unknown,
    value: string | SearchResultType | null,
  ) => {
    if (value && typeof value !== "string") {
      navigate(`/wiki/${spaceKey}/pages/${value.id}`);
      setQuery("");
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={results}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      inputValue={query}
      onInputChange={(_, value) => setQuery(value)}
      onChange={handleSelect}
      loading={searching}
      noOptionsText={query.length < 2 ? "2글자 이상 입력" : "결과 없음"}
      renderOption={({ key, ...props }, option) => (
        <li key={key} {...props}>
          <Typography variant="body2">
            {(option as SearchResultType).title}
          </Typography>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="페이지 검색..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <SearchOutlined
                  sx={{ mr: 1, color: "text.disabled", fontSize: 20 }}
                />
              ),
              endAdornment: (
                <>
                  {searching && <CircularProgress size={16} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      sx={{ width: 280 }}
    />
  );
};
