import { FiFilter } from "react-icons/fi";

const FilterCard = () => {
  return (
    <div className="hidden lg:block">
      <div className="mt-[64px] mb-[54px]">
        <form className="flex justify-between">
          <select>
            <option value="region">Region</option>
            <option value="tashkentcity">Tashkent</option>
            <option value="region">Tashkent region</option>
            <option value="region">Andijan region</option>
          </select>
          <select>
            <option value="region">City/district</option>
            <option value="tashkentcity">Tashkent</option>
            <option value="region">Tashkent region</option>
            <option value="region">Andijan region</option>
          </select>
          <select>
            <option value="region">Choose</option>
            <option value="tashkentcity">No result found</option>
          </select>
          <input
            type="text"
            placeholder="Number"
            className="border border-secondGrey rounded-md text-[14px] text-lightGrey outline-none py-[7px] pl-[11px]"
          />
          <select>
            <option value="region">Rent</option>
            <option value="tashkentcity">Tashkent</option>
            <option value="region">Tashkent region</option>
            <option value="region">Andijan region</option>
          </select>

          <button
            type="text"
            className="py-1 px-4 rounded-md border border-secondGrey flex">
            Filter
            <FiFilter size={20} />
          </button>

          <button
            type="submit"
            className="py-1 px-4 rounded-md bg-primary text-lightWhite text-[18px] font-bold">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterCard;
