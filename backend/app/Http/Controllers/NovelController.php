<?
namespace  App\Http\Controllers;

use App\Models\Novel;
use illuminate\Http\Request;

class NovelController extends Controller {
    public function show($id) {
        $novel = Novel::findOrFail($id);
        return response()->json($novel);
    }
}
?>
