
import { Card } from "@/components/ui/card";
import { shopData } from "@/lib/gemini";

const ShopTable = () => {
  return (
    <Card className="w-full border border-border overflow-hidden">
      <div className="p-4 bg-secondary/50 border-b border-border">
        <h3 className="text-sm font-medium">Shop Data Context</h3>
        <p className="text-xs text-muted-foreground">
          This data is automatically included as context in your queries
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Shop
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Shop Description
              </th>
            </tr>
          </thead>
          <tbody>
            {shopData.map((shop, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-secondary/20"}
              >
                <td className="py-3 px-4 text-sm">{shop.name}</td>
                <td className="py-3 px-4 text-sm">{shop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ShopTable;
