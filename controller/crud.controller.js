const { v4 } = require("uuid");
const { read_file, write_file } = require("../api/file-system");

const getAllcruds = async (req, res) => {
  try {
    const crud = read_file("crud.json");

    res.status(200).json(crud);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOnecrud = async (req, res) => {
  try {
    const { id } = req.params;
    const crud = read_file("crud.json");

    const foundedcrud = crud.find((item) => item.id === id);

    if (!foundedcrud) {
      return res.json({
        message: "Not found",
      });
    }

    res.status(200).json(foundedcrud);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addcrud = async (req, res) => {
  try {
    const { title , time} = req.body;

    const crud = read_file("crud.json");
console.log(req.user);

    crud.push({
      id: v4(),
      title,
      time,
      added_by : req.user.id
    });

    write_file("crud.json", crud);
    res.status(200).json({
      message: "Added new crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatecrud = async (req, res) => {
  try {
    const { id } = req.params;
    const { ilm, kunlikish, sport } = req.body;
    const crud = read_file("crud.json");

    const foundedcrud = crud.find((item) => item.id === id);

    if (!foundedcrud) {
      return res.json({
        message: "Not found",
      });
    }
    if (foundedcrud.added_by !== req.user.id) {
        return res.json({
            message : "forbidden"
        })
    }

    crud.forEach((item, idx) => {
      if (item.id === id) {
        item.ilm = ilm ? ilm : item.ilm;
        item.kunlikish = kunlikish ? kunlikish : item.kunlikish;
        item.sport = sport ? sport : item.sport;
      }
    });

    write_file("crud.json", crud);

    res.status(200).json({
      message: "Updated crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletecrud = async (req, res) => {
  try {
    const { id } = req.params;
    const crud = read_file("crud.json");

    const foundedcrud = crud.find((item) => item.id === id);

    if (!foundedcrud) {
      return res.json({
        message: "Not found",
      });
    }
    /////////////
 if (foundedcrud.added_by !== req.user.id) {
        return res.json({
            message : "forbidden"
        })
    }
    ///////////////
    crud.forEach((item, idx) => {
      if (item.id === id) {
        crud.splice(idx, 1);
      }
    });

    write_file("crud.json", crud);

    res.status(200).json({
      message: "Deleted crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllcruds,
  getOnecrud,
  addcrud,
  updatecrud,
  deletecrud,
};
