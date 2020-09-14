// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Xmaterials from "./../../util/xmaterial.json"

export default (req, res) => {
  res.statusCode = 200
  res.json(Xmaterials)
}
