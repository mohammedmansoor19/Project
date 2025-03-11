 {/* <div className="d-flex ">
        <div className="col-md-2"></div>
        <iframe
          height="250"
          width="800"
          style={{ border: 0 }}
          loading="lazy"
          title="Maps"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU
          &q=${search ? search : "Hyderabad"}`}
        ></iframe><div className="row">
            <div className=" flex mt-2">

        <div className="col">
          <input
            type="text"
            className="form-control my-2 w-60"
            placeholder="Type here to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col  form-floating">
          <select
          id="location"
            className="form-select w-60  "
            aria-label="Default select example"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          >
            <option ></option>
            <option  value="young minds technology">
              Select Current Location
            </option>
          </select>
          <label className="text-primary" htmlFor="location"><b> Current Location</b></label>
        </div>
      </div>
            </div>

      </div> */}